
<template>
  <div class="map_point">
    <div class="map-head">
      <el-select
        v-model="addrVal"
        :loading="loading"
        clearable
        remote
        filterable
        reserve-keyword
        placeholder="请输入关键词"
        style="width: 320px"
        :remote-method="remoteMethod"
        @change="selectChange"
      >
        <el-option
          v-for="item in addrList"
          :key="item.id"
          :label="item.name"
          :value="item.name + '_' + item.district"
        >
          <div
            class="option"
            style="display: flex; justify-content: space-between"
          >
            <span>{{ item.name }}</span>
            <span style="margin-left: 20px; color: #999; font-size: 12px">
              {{ item.district }}
            </span>
          </div>
        </el-option>
      </el-select>
      <div class="currentAddr">当前选择地址：{{ currentAddr.name }}</div>
    </div>
    <div id="container" style="width: 100%; height: 500px" />
  </div>
</template>


<script>
import AMapLoader from "@amap/amap-jsapi-loader";
// 安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "f3621c512bfeb17aa8fed9ff6a8f9542",
};
export default {
  data() {
    return {
      agentAddress: "",
      loading: false,
      addrVal: "",
      currentAddr: {},
      addrList: [],
      mapEl: null,
      aMap: null,
      geolocation: null,
      autoComplete: null,
      marker: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "64a2ebfa06ce351f2fd56262ad90a334",
        version: "2.0",
        plugins: [
          "AMap.AutoComplete",
          "AMap.Marker",
          "AMap.PlaceSearch",
          "AMap.Geolocation",
        ],
      })
        .then((AMap) => {
          this.aMap = AMap;
          this.mapEl = new AMap.Map("container", {
            viewMode: "3D", // 是否为3D地图模式
            zoom: 12, // 初始化地图级别
            // center: [116.397428, 39.90923] // 初始化地图中心点位置  默认当前行政区
          });
          this.autoComplete = new AMap.AutoComplete({
            city: "全国",
          });
          if (this.info.lng && this.info.lat) {
            this.addmark(this.currentAddr);
          }
          this.mapEl.on("click", (e) => {
            console.log(e);
          });
        })
        .catch((e) => {
          console.error("加载错误提示", e); //加载错误提示
        });
    },
    addmark(info) {
      if (this.marker) this.mapEl.remove(this.marker);
      this.currentAddr = info;
      this.marker = new this.aMap.Marker({
        position: new this.aMap.LngLat(info.lng, info.lat),
        title: info.name, // 鼠标滑过点标记时的文字提示
        label: {
          content: info.name, // 文本标注的内容
        },
        // zooms: 14 // 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
      });
      this.mapEl.add(this.marker);
      this.mapEl.setCenter([info.lng, info.lat], false, 500); // 中心点 是否直接迁移(动画过度) 过渡时间
    },
    // 自定义远程搜索方法
    remoteMethod(e) {
      if (e.trim() != "") {
        this.loading = true;
        setTimeout(() => {
          this.autoComplete.search(e, (status, result) => {
            console.log(status, result);
            this.loading = false;
            if (status == "complete" && result.tips.length) {
              this.addrList = result.tips;
            }
          });
        }, 200);
      }
    },
    selectChange(e) {
      if (!e) return;
      let info = this.addrList.find((v) => v.name + "_" + v.district == e);
      this.agentAddress = info.district + info.address + info.name;
      if (info.location) {
        // 自动适应显示想显示的范围区域
        // this.mapEl.setFitView()
        this.addmark({ ...info.location, name: info.name });
      } else {
        this.$message.warning("该地点经纬度信息缺失");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.map_point {
  width: 100%;
  height: 500px;
  position: relative;
}
.dialog {
  border-radius: 4px;
  background-color: #ffffff;
  .map-head {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  #container {
    height: 500px;
    width: 100%;
    margin-top: 10px;
  }
}
.map-head {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 10px;
  padding-top: 0px;
  background-color: #fff;
  display: flex;
  align-items: center;
}
.currentAddr {
  margin-left: 32px;
}
</style>
