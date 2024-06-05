<template>
  <div class="chat-container">
    <div class="chat-title">
      <div class="chat-title-l">
        <img :src="friend.avatar?friend.avatar:require('../../../../assets/image/img-user.jpg')" class="chat-avatar" @click="clickAvatar"/>
        <div class="chat-name">{{ friend.name }}</div>
      </div>
      <div class="position-name">
        <!-- <span class="span-1">沟通岗位：</span> -->
        <span class="span-2">{{ infoData.position_name }}</span>
      </div>
    </div>
    <div class="chat-main" ref="scrollView">
      <div class="message-list" ref="messageList">
        <div v-if="history.loading" class="history-loading">
          <img src="../../../../assets/images/pending.gif"/>
        </div>
        <div v-else :class="history.allLoaded ? 'history-loaded':'load'" @click="loadHistoryMessage(false)">
          {{ history.allLoaded ? '已经没有更多的历史消息' : '获取历史消息' }}
        </div>
        <div v-for="(message, index) in history.messages" :key="index">
          <!-- 时间 -->
          <div class="time-tips">{{ renderMessageDate(message, index) }}</div>


          <div class="message-recalled" v-if="message.recalled">
            <div v-if="message.senderId !== currentUser.id">{{ friend.name }}撤回了一条消息</div>
            <div v-else class="message-recalled-self">
              <div>你撤回了一条消息</div>
              <span v-if="message.type === 'text' && Date.now()-message.timestamp< 3 * 60 * 1000 " @click="editRecalledMessage(message.payload.text)">重新编辑</span>
            </div>
          </div>
          <!-- 内容区域 开始 -->
          <div class="message-item" v-if="!message.recalled ">
            <div class="message-item-checkbox" v-if="messageSelector.visible && message.status !== 'sending'">
              <input class="input-checkbox" type="checkbox" :value="message.messageId" v-model="messageSelector.ids" @click="selectMessages">
            </div>
            <div class="message-item-content" :class="{ self: message.senderId === currentUser.id }">
              <!-- 头像 开始 -->
              <div class="sender-info" v-if="currentUser.id === message.senderId">
                <img :src="currentUser.avatar?currentUser.avatar:require('../../../../assets/image/img-user.jpg')" class="sender-avatar"/>
                <!-- <span class="span-id">ID: {{ currentUser.user_number }}</span> -->
              </div>
              <div class="sender-info" v-else>
                <img :src="friend.avatar?friend.avatar:require('../../../../assets/image/img-user.jpg')" class="sender-avatar"/>
                <!-- <span class="span-id">ID: {{ friend.user_number }}</span> -->
              </div>
              <!-- 头像 结束 -->
              <div class="message-content" @contextmenu.prevent.stop="e => showActionPopup(message,$event)">
              <!-- <div class="message-content"> -->
                <div class="message-payload">
                  <div class="pending" v-if="message.status === 'sending'"></div>
                  <div class="send-fail" v-if="message.status === 'fail'"></div>

                  <!-- 内容 开始 -->
                  <div v-if="message.type === 'text'" class="content-text" v-html="emoji.decoder.decode(message.payload.text)"></div>
                  <!-- 内容 结束 -->
                  <!-- 音视频 开始 -->
                  <div v-if="message.type === 'TUICallKit'" class="content-text" v-html="message.payload.text"></div>
                  <!-- 音视频 结束 -->
                  <!-- 简历 开始 -->
                  <a v-if="message.type === 'resume'" :href="message.payload.resume" target="_blank" download="download">
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">个人简历</span>
                      </div>
                      <img class="file-img" src="../../../../assets/image/icon-zxjl.png"/>
                    </div>
                  </a>
                  <!-- 简历 结束 -->
                  <!-- 图片 开始 -->
                  <div v-if="message.type === 'image' || message.type === 'images'" class="content-image" @click="showImagePreviewPopup(message.payload.url)">
                    <img :src="message.payload.url" :style="{height:getImageHeight(message.payload.width,message.payload.height)+'px'}"/>
                  </div>
                  <!-- 图片 结束 -->
                  <!-- 素质测评 开始 -->
                  <div v-if="message.type === 'quality'">
                    <h4 class="message-phone-universal-card-header">已向对方发送素质测评邀请</h4>
                    <div class="message-phone-box view-btn" @click.stop="clickQuality(message)">查看素质测评结果</div>
                  </div>
                  <!-- 素质测评 结束 -->
                  <!-- 发送的面试邀请 开始 -->
                  <div v-if="message.type === 'interview' &&  message.payload.way_status == 1" class="message-phone-universal-card">
                    <h4 class="message-phone-universal-card-header">已向对方发送面试邀请</h4>
                    <div class="message-phone-universal-card-content">
                      <div><span>面试岗位：</span><span>{{message.payload.position_name?message.payload.position_name:''}}</span></div>
                      <div><span>面试时间：</span><span>{{message.payload.interview_time?message.payload.interview_time:''}}</span></div>
                      <div><span>面试地址：</span><span>{{message.payload.interview_address?message.payload.interview_address:''}}</span></div>
                    </div>
                    <div class="message-phone-box view-btn" @click.stop="clickInterview(message)">查看面试信息</div>
                  </div>
                  <!-- 发送的面试邀请 结束 -->
                  <!-- 同意面试邀请 开始 -->
                  <div v-if="message.type === 'interview' &&  message.payload.way_status == 3" class="message-phone-universal-card">
                    <h4 class="message-phone-universal-card-header">面试邀请</h4>
                    <div class="message-phone-box">接受了您的面试邀请</div>
                  </div>
                  <!-- 同意面试邀请 结束 -->
                  <!-- 拒绝面试邀请 开始 -->
                  <div v-if="message.type === 'interview' &&  message.payload.way_status == 2" class="message-phone-universal-card">
                    <h4 class="message-phone-universal-card-header">面试邀请</h4>
                    <div class="message-phone-box">拒绝了您的面试邀请</div>
                  </div>
                  <!-- 拒绝面试邀请 结束 -->

                  <!-- boss 索要手机号 4 ↓ -->
                  <div class="message-phone-universal-card"  v-if="message.type === 'phone' && message.payload.way_status == 4">
                    <h4 class="message-phone-universal-card-header">联系方式</h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的手机号：{{ message.payload.real_phone }}</span>
                    </div>
                    <div class="message-phone-box">您已向对方发送交换联系方式</div>
                  </div>
                  <!-- boss 索要手机号 ↑ -->

                  <div class="message-phone-universal-card"  v-if="message.type === 'phone' && message.payload.way_status == 2">
                    <h4 class="message-phone-universal-card-header">联系方式</h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的手机号：{{ message.payload.real_phone }}</span>
                    </div>
                    <div class="message-phone-box">您已同意对方交换联系方式</div>
                  </div>

                  <!-- 个人 发送过来的手机号 ↓ -->
                  <div class="message-phone-universal-card" v-if="message.type === 'phone' && message.payload.way_status == 3">
                    <h4 class="message-phone-universal-card-header">联系方式</h4>
                    <div class="message-phone-universal-card-content">
                      <span>{{ message.payload.real_name }}的手机号：{{ message.payload.real_phone }}</span>
                    </div>
                  </div>
                  <!-- 个人 发送过来的手机号 ↑ -->
                  <!-- 个人 索要手机号 ↓ -->
                  <div class="message-phone-universal-card" v-if="message.type === 'phone' && message.payload.way_status == 1">
                    <h4 class="message-phone-universal-card-header">联系方式</h4>
                    <div class="message-phone-universal-card-content">
                      <span>对方请求交换联系方式</span>
                    </div>
                    <div class="message-phone-universal-card-footer">
                      <div class="message-phone-universal-card-btn-main message-phone-universal-card-btn" @click="clickPhoneWechatBtn(2,2,'phone',message)">同意交换</div>
                    </div>
                  </div>
                  <!-- 个人 索要手机号 ↑ -->

                  <!-- 交换微信功能展示 ↓   -->
                  <!-- boss 索要微信< 4 ↓ -->
                  <div class="message-phone-universal-card"  v-if="message.type === 'wechat' && message.payload.way_status == 4">
                    <h4 class="message-phone-universal-card-header">交换微信</h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的微信：{{ message.payload.wechat_number }}</span>
                    </div>
                    <div class="message-phone-box">您已向对方发送交换微信</div>
                  </div>
                  <!-- boss 索要微信 ↑ -->

                  <div class="message-phone-universal-card"  v-if="message.type === 'wechat' && message.payload.way_status == 2">
                    <h4 class="message-phone-universal-card-header">交换微信</h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的微信：{{ message.payload.wechat_number }}</span>
                    </div>
                    <div class="message-phone-box">您已同意对方交换微信</div>
                  </div>

                  <!-- 个人 发送过来的微信 ↓ -->
                  <div class="message-phone-universal-card" v-if="message.type === 'wechat' && message.payload.way_status == 3">
                    <h4 class="message-phone-universal-card-header">交换微信</h4>
                    <div class="message-phone-universal-card-content">
                      <span>{{ message.payload.real_name }}的微信：{{ message.payload.wechat_number }}</span>
                    </div>
                  </div>
                  <!-- 个人 发送过来的微信 ↑ -->
                  <!-- 个人 索要微信 ↓ -->
                  <div class="message-phone-universal-card" v-if="message.type === 'wechat' && message.payload.way_status == 1">
                    <h4 class="message-phone-universal-card-header">交换微信</h4>
                    <div class="message-phone-universal-card-content">
                      <span>对方请求交换微信</span>
                    </div>
                    <div class="message-phone-universal-card-footer">
                      <div class="message-phone-universal-card-btn-main message-phone-universal-card-btn" @click="clickPhoneWechatBtn(2,2,'wechat',message)">同意交换</div>
                    </div>
                  </div>
                  <!-- 个人 索要微信 ↑ -->

                  <!-- 交换微信功能展示 ↑   -->

                  <!-- 文件 开始 -->
                  <a v-if="message.type === 'file'" :href="message.payload.url" target="_blank" download="download">
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">{{ message.payload.name }}</span>
                        <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
                      </div>
                      <img class="file-img" src="../../../../assets/images/file-icon.png"/>
                    </div>
                  </a>
                  <!-- 文件 结束 -->
                  <!-- 视频 开始 -->
                  <goeasy-video-player v-if="message.type === 'video'" :thumbnail="message.payload.thumbnail" :src="message.payload.video.url" />
                  <!-- 视频 结束 -->


                </div>
                <div v-if="currentUser.id === message.senderId" :class="message.read ?'message-read':'message-unread'">
                  <div v-if="message.senderId === currentUser.id">{{ message.read ? '已读' : '未读' }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 内容区域 结束 -->
        </div>
      </div>
    </div>
    <div class="chat-footer" :style="`height:${is_pop == 'pop'?'120':'140'}px;`">
      <div class="action-delete" v-if="messageSelector.visible">
        <!-- <img class="delete-btn" src="../../../../assets/images/delete.png" @click="deleteMultipleMessages"/> -->
        <div @click="cancelMultipleMessages">取消选择</div>
        <div class="delete-text" @click="deleteMultipleMessages">删除</div>
      </div>
      <div class="action-box" v-else>
        <div class="action-bar">
          <div class="action-bar-left">
            <!-- 常用语 -->
            <div class="action-item">
              <div v-if="cyy.visible" class="sentence-panel">
                <div class="header">
                  <h3 class="title">常用语</h3>
                  <a href="javascript:0;" class="set-btn" @click="clickSetBtn">设置</a>
                </div>
                <ul>
                  <li v-for="(item,index) in phraseslist" :key="index" @click="clickCyy(item.common_language)"> {{ item.common_language }}</li>
                </ul>
              </div>
              <i class="iconfont icon-changyongyu" title="常用语" @click="showCyyBox"></i>
            </div>
            <!-- 表情 -->
            <!-- <div class="action-item">
              <div v-if="emoji.visible" class="emoji-box">
                <img
                  v-for="(emojiItem, emojiKey, index) in emoji.map"
                  class="emoji-item"
                  :key="index"
                  :src="emoji.url + emojiItem"
                  @click="chooseEmoji(emojiKey)"
                />
              </div>
              <i class="iconfont icon-biaoqing" title="表情" @click="showEmojiBox"></i>
            </div> -->
            <!-- 图片 -->
            <div class="action-item">
              <label for="img-input" v-if="userVipRank > 0">
                <i class="iconfont icon-tupian" title="图片"></i>
              </label>
              <label  @click="clickvipRank_0" v-else>
                <i class="iconfont icon-tupian" title="图片"></i>
              </label>
              <input v-show="false" id="img-input" accept="image/*" multiple type="file" @change="sendImageMessage"/>
            </div>
            <!-- 视频 -->
            <!-- <div class="action-item">
              <label for="video-input"><i class="iconfont icon-film" title="视频"></i></label>
              <input v-show="false" id="video-input" accept="video/*" type="file"
                    @change="sendVideoMessage"/>
            </div> -->
            <!-- 文件 -->
            <div class="action-item">
              <label for="file-input" v-if="userVipRank > 0">
                <i class="iconfont icon-wenjianjia" title="文件"></i>
              </label>
              <label @click="clickvipRank_0" v-else>
                <i class="iconfont icon-wenjianjia" title="文件"></i>
              </label>
              <input v-show="false" id="file-input" type="file"  @change="sendFileMessage"/>
            </div>
            <i class="vline"></i>
            <div class="btn-resume toolbar-btn unable" title="交换联系方式" @click="clickPhoneWechatBtn(1,4,'phone')">联系方式</div>
            <div class="btn-resume toolbar-btn unable" title="邀请面试" @click="clickYqms(1)">邀面试</div>
            <div class="btn-resume toolbar-btn unable" title="交换微信" @click="clickPhoneWechatBtn(1,4,'wechat')">换微信</div>
          </div>
          <div class="action-bar-right">
            <div class="action-item" style="position: relative; z-index: 999;">
              <i class="el-icon-scissors" style="font-size: 18px;margin-right: 6px;" title="截图" @click="clickScreenShot()"></i>
            </div>
            <div class="action-item">
              <i class="iconfont icon-dianhua" title="电话" @click="clickCall(1)"></i>
            </div>
            <div class="action-item">
              <i class="iconfont icon-shipin" title="视频" @click="clickCall(2)"></i>
            </div>
          </div>

        </div>

        <!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
        <div class="input-box" @click.stop="clickInput">
          <textarea ref="input" @focus="onInputFocus" @keyup.enter="sendTextMessage" placeholder="输入内容...." v-model="text" maxlength="700"  class="input-content"></textarea>
        </div>
        <div class="send-box">
          <button class="send-button" @click="sendTextMessage">发送</button>
        </div>
      </div>
    </div>
    <!-- 图片预览弹窗 -->
    <div v-if="imagePreview.visible" class="image-preview">
      <img :src="imagePreview.url" alt="图片"/>
      <span class="close" @click="hideImagePreviewPopup">×</span>
    </div>
    <!-- 消息删除撤回弹窗 -->
    <div class="action-popup" v-if="actionPopup.visible" @click="actionPopup.visible = false">
      <div class="action-popup-main" :style="`top:${topY}px;left:${leftX}px;`">
        <div class="action-item" @click="deleteSingleMessage">删除</div>
        <div class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</div>
        <div class="action-item" @click="showCheckBox">多选</div>
        <div class="action-item" @click="showCancel">取消</div>
      </div>
    </div>


    <!-- 预览在线简历 弹窗  -->
    <onlineResume ref="onlineResume" :infoData="userData" :basic_info="basic_info" :is_type="is_type" />

    <!-- 邀请面试信息弹窗 -->
    <div class="yqms-popup">
      <el-dialog title="邀请面试" :visible.sync="yqmsVisible" width="580px">
        <div class="cententinfo-box">
          <div class="items-box">
            <div class="title">面试职位：</div>
            <el-select :popper-append-to-body="false" v-model="interviewData.position" placeholder="面试职位" @change="changeIndustry">
              <el-option :label="item.position_name" :value="item" v-for="(item,index) in positionList" :key="index">{{ item.position_name }}</el-option>
            </el-select>
          </div>
          <div class="items-box">
            <div class="title">联系人：</div>
            <el-input v-model="interviewData.staff" placeholder="联系人"></el-input>
          </div>
          <div class="items-box">
            <div class="title">联系电话：</div>
            <el-input v-model="interviewData.phone" placeholder="联系电话"></el-input>
          </div>
          <div class="items-box">
            <div class="title">面试时间：</div>

            <el-date-picker
              v-model="interviewData.interview_time"
              type="datetime"
               value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="items-box">
            <div class="title">面试地址：</div>
            <el-input v-model="interviewData.interview_address" placeholder="点击地图选择精准地址" disabled @click="showMap"></el-input>
            <div class="icon-dt-box" @click="showMap">
              <img src="../../../../assets/image/icon-dt.png" alt="" />
              <span>选择地址</span>
            </div>
          </div>
          <div class="items-box">
            <div class="title">素质测评：</div>
            <el-switch
              style="display: block"
              v-model="qualityVal"
              active-color="#1ec5d8" />
          </div>
          <div class="items-box">
            <div class="title">面试准备事项：</div>
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 12}" placeholder="请您准备好个人纸质简历，正装参加面试、女士淡妆，请准时到达" v-model="interviewData.remark"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clickInterviewInvitation">邀请面试</el-button>
        </span>
      </el-dialog>
    </div>
     <!-- 查看面试邀请详情----弹窗 -->
    <div class="container-zx">
      <el-dialog :title="ms_infoData.text" :center="false" :visible.sync="ms_dialogVisible" width="600px" :before-close="ms_handleClose">
        <div class="pc-preview-wrapper">
          <div class="talent-box">
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试岗位：</div>
                <div class="items-text">{{ms_infoData.position_name?ms_infoData.position_name:''}}</div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">投递人：</div>
                <div class="items-text">{{ ms_infoData.name?ms_infoData.name:'暂无' }}</div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">联系电话：</div>
                <div class="items-text">{{ms_infoData.phone?ms_infoData.phone:'暂无'}}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试时间：</div>
                <div class="items-text">{{ms_infoData.interview_time?ms_infoData.interview_time:'暂无'}}</div>
              </div>
            </div>
            <div class="box-items" v-if="ms_infoData.remark">
              <div class="items items-l">
                <div class="items-label">备注：</div>
                <div class="items-text">{{ms_infoData.remark?ms_infoData.remark:''}}</div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试地址：</div>
                <div class="items-text">{{ms_infoData.interview_address?ms_infoData.interview_address:''}}</div>
              </div>
            </div>
            <div id="baidu-msyq" style="width: 560px; height: 340px;"></div>
          </div>

        </div>
      </el-dialog>
    </div>
    <!-- 百度地图位置选择 -->
    <BMapAddressSelect ref="bmapAddressSelect" @confirmMapAddress="confirmMapAddress"></BMapAddressSelect>

  </div>
</template>

<script>
  import {formatDate} from '../../../../utils/utils.js'
  import EmojiDecoder from '../../../../utils/EmojiDecoder';
  import GoeasyVideoPlayer from "../../../../components/GoEasyVideoPlayer";
  import onlineResume from '../onlineResume.vue';
  import BMapAddressSelect from "../../../../components/BMapAddressSelect/index";
  import BaiduMap from '../../../../utils/map.js'
  import ScreenShot from 'js-web-screen-shot'

  const IMAGE_MAX_WIDTH = 200;
  const IMAGE_MAX_HEIGHT = 150;
  export default {
    name: 'PrivateChat',
    components: {
      GoeasyVideoPlayer,
      onlineResume,
      BMapAddressSelect
    },
    props:{
      infoData:{
        type: Object,
        default() {
          return {}
        }
      },
      is_pop:{
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
      const emojiMap = {
        '[么么哒]': 'emoji_3@2x.png',
        '[乒乓]': 'emoji_4@2x.png',
        '[便便]': 'emoji_5@2x.png',
        '[信封]': 'emoji_6@2x.png',
        '[偷笑]': 'emoji_7@2x.png',
        '[傲慢]': 'emoji_8@2x.png',
      };
      return {
        qualityVal: false,
        leftX: 0,
        topY: 0,
        userProfile:{}, // 个人信息
        phraseslist:[], // 常用语
        userVipRank: 0,
        currentUser: null,
        friend: null,

        to: {},//用于创建消息时传入

        history: {
          messages: [],
          allLoaded: false,
          loading: true
        },

        text: '',
        // 常用语
        cyy: {
          visible: false,
        },
        //定义表情列表
        emoji: {
          url: emojiUrl,
          map: emojiMap,
          visible: false,
          decoder: new EmojiDecoder(emojiUrl, emojiMap),
        },

        // 图片预览弹出框
        imagePreview: {
          visible: false,
          url: ''
        },
        audioPlayer: {
          playingMessage: null,
        },
        // 展示消息删除弹出框
        actionPopup: {
          visible: false,
          message: null,
          recallable: false,
        },
        // 消息选择
        messageSelector: {
          visible: false,
          ids: []
        },

        userData:{},
        basic_info:{},
        is_type:'',
        yqmsVisible: false,
        interviewData: {
          interview_address:'',
          time:'',
        }, // 邀请面试信息
        positionList:[],
        staffAvatar:'', // 企业端头像
        staffName:'', // 企业端名称
        //查看面试信息弹窗
        ms_dialogVisible: false,
        ms_infoData: {}
      };
    },
    watch:{
      '$store.state.user.staffAvatar'(newVal){
          this.staffAvatar = newVal;
          this.$forceUpdate();// 更新数据
      },
      '$store.state.user.staffName'(newVal){
        this.staffName = newVal;
        this.$forceUpdate();// 更新数据
      },
      '$store.state.TUICallKit.TUStatusInfo'(newVal){
        this.TUICallKitInfo(newVal);
        this.$forceUpdate();// 更新数据
      },
    },
    mounted(){

    },
    created() {
      this.userVipRank = localStorage.getItem('staffVipRank');
      this.friend = this.infoData; // 目标用户信息
      this.currentUser = {  // 我的信息--展示
        id: 'c_' + localStorage.getItem('staffUid'),
        uid: localStorage.getItem('staffUid'),
        name: this.$store.state.user.staffName,
        avatar: this.$store.state.user.staffAvatar,
        position_id: this.infoData.position_id, // 岗位id
        company_id: this.infoData.company_id,// 公司id
        position_name: this.infoData.position_name,
      };
      this.to = { // 目标用户
        type: this.GoEasy.IM_SCENE.PRIVATE,
        id: this.friend.id,
        data: {
          uid: this.infoData.uid,
          name: this.infoData.name,
          avatar: this.infoData.avatar,
          user_number: this.infoData.user_number,
          position_id: this.infoData.position_id, // 岗位id
          company_id: this.infoData.company_id,// 公司id
          position_name: this.infoData.position_name,
        },
      };
      console.log('to:',this.to);
      // 获取历史记录
      this.loadHistoryMessage(true);
      // 获取个人信息
      this.getUserProfile();
      // 获取职位
      this.getPositionList();
      this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onReceivedPrivateMessage);
    },
    beforeDestroy() {
      this.goEasy.im.off(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onReceivedPrivateMessage);
    },
    methods: {
      // 发送截图消息
      async screenshotMessage(image){
        var payload = {
          contentType: "image/jpeg",
          url: image,
        };
        
        this.goEasy.im.createCustomMessage({
          type: 'images',  // 自定义类型,不能添加image 
          payload,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      // 上传图片到服务器
      uploadFile(base64String){
        const that = this;
        // 将base64 转成FormData文件格式上传
        var bytes = window.atob(base64String.split(',')[1]);
        var array = [];
        for(var i = 0; i < bytes.length; i++){
            array.push(bytes.charCodeAt(i));
        }
        var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        var formData = new FormData();
        // --end--
        formData.append('file[]',blob, Date.now() + '.jpg');
        formData.append('up_tag','other');
        formData.append('pictureCategory','articleCover');
        console.log(formData);
        that.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then(res => {
          that.screenshotMessage(res.data.upload_files);
        }).catch(e => {
          that.$message.error({
            message: "系统繁忙，请稍后重试"
          })
        })
      },
      // 截图
      clickScreenShot() {
        // 截图确认按钮回调函数
        const that = this;
        const callback = ({base64, cutInfo}) => {
          that.uploadFile(base64);          
        };
        // 截图取消时的回调函数
        const closeFn = (err) => {
          console.log('截图窗口关闭' + err);
        };
        // eslint-disable-next-line no-new
        new ScreenShot({enableWebRtc: true, completeCallback: callback, closeCallback: closeFn});
        console.log(1);
      },
      // 音视频 -- 语音、视频按钮
      clickCall(t){
        this.$bus.$emit('clickCall',{to:this.to,currentUser:this.currentUser,type: t});
      },
      /** 显示地图 */
      showMap() {
        this.$refs.bmapAddressSelect.show();
      },

      /** 确认地图地址 */
      confirmMapAddress(addressInfo) {
        let that = this;
        that.addressInfo = addressInfo;
        console.log(that.addressInfo)
        that.$nextTick( () =>{
        })
        that.interviewData.latitude = addressInfo.latitude;
        that.interviewData.longitude = addressInfo.longitude;
        that.interviewData.interview_address = addressInfo.province +addressInfo.city +addressInfo.district +addressInfo.address ;
      },
      changeIndustry(e){
        console.log(e)
      },
      formatDate,
      onReceivedPrivateMessage(message) {
        if (message.senderId === this.friend.id) {
          this.history.messages.push(message);
          this.markPrivateMessageAsRead();
        }
        this.scrollToBottom();
      },
      /**
       * 核心就是设置高度，产生明确占位
       *
       * 小  (宽度和高度都小于预设尺寸)
       *    设高=原始高度
       * 宽 (宽度>高度)
       *    高度= 根据宽度等比缩放
       * 窄  (宽度<高度)或方(宽度=高度)
       *    设高=MAX height
       *
       * @param width,height
       * @returns number
       */
      getImageHeight(width, height) {
        if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
          return height;
        } else if (width > height) {
          return IMAGE_MAX_WIDTH / width * height;
        } else if (width === height || width < height) {
          return IMAGE_MAX_HEIGHT;
        }
      },
      playAudio(audioMessage) {
        let playingMessage = this.audioPlayer.playingMessage;

        if (playingMessage) {
          this.$refs.audioPlayer.pause();
          // 如果点击的消息正在播放，就认为是停止播放操作
          if (playingMessage === audioMessage) {
            return;
          }
        }

        this.audioPlayer.playingMessage = audioMessage;
        this.$refs.audioPlayer.src = audioMessage.payload.url;
        this.$refs.audioPlayer.load();
        this.$refs.audioPlayer.currentTime = 0;
        this.$refs.audioPlayer.play();
      },
      onAudioPlayEnd() {
        this.audioPlayer.playingMessage = null;
      },
      // 点击 邀请面试
      clickYqms(n){
        // n == 1, 发送邀请面试
        // this.$bus.$emit('clickYqms');
        this.yqmsVisible = true;
        return
      },
      // 交换联系方式
      clickPhoneWechatBtn(type,n,tag,i){
        let that = this;
        let userProfile = this.userProfile;
        let item = i;
        let p = {
          position_id: that.infoData.position_id, // 岗位id
          company_id: localStorage.getItem('company_id'),// 公司id
          uid: that.infoData.uid,
        }
        let apiUrl = '';
        // type ==1 点击 交换联系方式按钮  type ==2  列表内 点击同意交换联系方式
        if(type == 1){
          apiUrl = '/api/company-interview/get-contact-information';
        }
        if(type == 2){
          apiUrl = '/api/company-interview/operate-contact-information';
          p.status = 1;
        }// tag : 'phone' 手机的联系方式  'wechat' 微信的联系方式
        if(tag == 'phone'){
          p.company_phone =  userProfile.phone;
          if(type == 2){
            p.user_phone = item.payload.real_phone;
          }
        }
        if(tag == 'wechat'){
          p.company_wx = userProfile.company_wx;
          if(type == 2){
            p.user_wx = item.payload.wechat_number;
          }
          if(!p.company_wx || p.company_wx == ''){
            that.$message.warning('请先在个人信息内添加微信!');
            return
          }
        }

        that.$axios.post(apiUrl,p).then( res =>{
          console.log(res)
          if( res.code == 0){
            if(tag == 'phone'){
              that.sendPhoneMsg(n);
            }
            if(tag == 'wechat'){
              that.sendWechatMsg(n);
            }
          }else{
            that.$message.error({
              message: res.msg
            })
          }
        })
      },
      // 点击 交换联系方式 --- 发送自定义消息
      sendPhoneMsg(n){
        let userProfile = this.userProfile;
        let payload = {
          text: '交换联系方式',
          real_phone: userProfile.phone,
          phone: userProfile.phone,
          real_name: userProfile.staff_name,
          name: userProfile.staff_name,
          way_status: n,  // 1. 向对方发起交换联系方式发出请求,2.boss 发送过来的手机号(boss同意) 3.同意对方索要联系方式 4. boss发送交换联系方式发出请求
        }
        this.goEasy.im.createCustomMessage({
          type: 'phone',  //字符串，可以任意自定义类型 phone 联系方式
          text: '交换联系方式',
          payload,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      // 发送交换微信聊天信息
      sendWechatMsg(n){
        let userProfile = this.userProfile;
        let payload = {
          text: '交换微信',
          wechat_number: userProfile.company_wx,
          real_name: userProfile.staff_name,
          name: userProfile.staff_name,
          way_status: n,  // 1. 向对方发起交换联系方式发出请求,2.boss 发送过来的手机号(boss同意) 3.同意对方索要联系方式 4. boss发送交换联系方式发出请求
        }
        this.goEasy.im.createCustomMessage({
          type: 'wechat',  //字符串，可以任意自定义类型 wechat 联系方式
          text: '交换微信',
          payload,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      sendTextMessage() {
        if (!this.text.trim()) {
          this.$message.error({
            message:'输入不能为空!'
          })
          return
        }
        console.log(this.to)
        let p = {
          uid: this.to.data.uid,
          position_id: this.infoData.position_id, // 岗位id
          company_id: this.infoData.company_id,// 公司id
          content: this.text,
        }
        this.$axios.post('/api/company/find-user',p);
        this.goEasy.im.createTextMessage({
          text: this.text,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
            this.text = '';
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      onInputFocus () {
        this.emoji.visible = false;
      },
      clickInput(){
        this.$refs.input.focus();
      },
      // 点击常用语 icon
      showCyyBox(){
        let that = this;
        if( that.cyy.visible ){
          that.cyy.visible = false;
          return
        }else{
          that.$axios.post('/api/common-language/list',{
            no_looding: 1, // 隐藏-- 封装请求里的 looding
          }).then(res =>{
            if(res.code == 0){
              that.phraseslist = res.data;
              that.cyy.visible = true;
            }else{
              that.$message.error({
                message:res.msg
              })
            }
          }).catch(e =>{
            console.log(e)
          })
        }
      },
      // 点击常用语列表
      clickCyy(text){
        this.text = text;
        this.cyy.visible = false;
      },
      showEmojiBox() {
        this.emoji.visible = !this.emoji.visible;
      },
      chooseEmoji(emojiKey) {
        this.text += emojiKey;
        this.emoji.visible = false;
      },
      sendImageMessage(e) {
        let fileList = [...e.target.files];
        fileList.forEach((file) => {
          this.goEasy.im.createImageMessage({
            file: file,
            to: this.to,
            onProgress: function (progress) {
              console.log(progress)
            },
            onSuccess: (message) => {
              this.sendMessage(message);
            },
            onFailed: (e) => {
              console.log('error :', e);
            }
          });
        })
      },

      sendVideoMessage(e) {
        const file = e.target.files[0];
        this.goEasy.im.createVideoMessage({
          file: file,
          to: this.to,
          onProgress: function (progress) {
            console.log(progress)
          },
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (e) => {
            console.log('error :', e);
          }
        });
      },

      sendFileMessage(e) {
        const file = e.target.files[0];
        this.goEasy.im.createFileMessage({
          file: file,
          to: this.to,
          onProgress: function (progress) {
            console.log(progress)
          },
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (e) => {
            console.log('error :', e);
          }
        });
      },
      sendMessage(message) {
        this.history.messages.push(message);
        this.scrollToBottom();
        this.goEasy.im.sendMessage({
          message: message,
          onSuccess: (message) => {
            console.log('发送成功', message);
          },
          onFailed: function (error) {
            if (error.code === 507) {
              alert('发送失败，没有配置OSS存储');
              console.log('发送失败，没有配置OSS存储');
            } else {
              console.log('发送失败:', error);
            }
          }
        });
      },
      showActionPopup(message,e) {
        this.leftX = e.layerX;
        this.topY = e.layerY;
        const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
        this.messageSelector.ids = [message.messageId];
        if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.id && message.status === 'success') {
          this.actionPopup.recallable = true;
        } else {
          this.actionPopup.recallable = false;
        }
        this.actionPopup.visible = true;
      },
      deleteSingleMessage() {
        this.actionPopup.visible = false;
        this.deleteMessage();
      },
      showCancel(){
        this.messageSelector.ids = [];
        this.messageSelector.visible = false;
        this.actionPopup.visible = false;
      },
      // 确认删除按钮
      deleteMultipleMessages() {
        if (this.messageSelector.ids.length > 0) {
          this.messageSelector.visible = false;
          this.deleteMessage();
        }
      },
      // 取消选择按钮
      cancelMultipleMessages(){
        this.messageSelector.ids = [];
        setTimeout( ()=>{
          this.messageSelector.visible = false;
        },1000)
      },
      deleteMessage() {
        let conf = confirm("确认删除？");
        if (conf === true) {
          let selectedMessages = [];
          this.history.messages.forEach((message) => {
            if (this.messageSelector.ids.includes(message.messageId)) {
              selectedMessages.push(message);
            }
          });
          this.goEasy.im.deleteMessage({
            messages: selectedMessages,
            onSuccess: () => {
              selectedMessages.forEach((message) => {
                let index = this.history.messages.indexOf(message);
                if (index > -1) {
                  this.history.messages.splice(index, 1);
                }
              });
              this.messageSelector.ids = [];
            },
            onFailed: (error) => {
              console.log('error:', error);
            },
          });
        } else {
          this.messageSelector.ids = [];
        }
      },
      recallMessage() {
        let selectedMessages = [];
        this.history.messages.forEach((message) => {
          if (this.messageSelector.ids.includes(message.messageId)) {
            selectedMessages.push(message);
          }
        });
        this.actionPopup.visible = false;
        this.goEasy.im.recallMessage({
          messages: selectedMessages,
          onSuccess: () => {
            console.log('撤回成功');
          },
          onFailed: (error) => {
            console.log('撤回失败,error:', error);
          }
        });
      },
      editRecalledMessage(text) {
        this.text = text;
      },
      showImagePreviewPopup(url) {
        this.imagePreview.visible = true;
        this.imagePreview.url = url;
      },
      hideImagePreviewPopup() {
        this.imagePreview.visible = false;
      },
      showCheckBox() {
        this.messageSelector.ids = [];
        this.messageSelector.visible = true;
        this.actionPopup.visible = false;
      },
      selectMessages(e) {
        if (e.target.checked) {
          this.messageSelector.ids.push(e.target.value)
        } else {
          let index = this.messageSelector.ids.indexOf(e.target.value);
          if (index > -1) {
            this.messageSelector.ids.splice(index, 1);
          }
        }
      },
      loadHistoryMessage(scrollToBottom) {
        this.history.loading = true;
        //历史消息
        let lastMessageTimeStamp = null;
        let lastMessage = this.history.messages[0];
        if (lastMessage) {
          lastMessageTimeStamp = lastMessage.timestamp;
        }
        this.goEasy.im.history({
          userId: this.friend.id,
          lastTimestamp: lastMessageTimeStamp,
          limit: 10,
          onSuccess: (result) => {
            console.log(result)
            this.history.loading = false;
            let messages = result.content;
            if (messages.length === 0) {
              this.history.allLoaded = true;
            } else {
              if (lastMessageTimeStamp) {
                this.history.messages = messages.concat(this.history.messages);
              } else {
                this.history.messages = messages;
              }
              if (messages.length < 10) {
                this.history.allLoaded = true;
              }
              if (scrollToBottom) {
                this.scrollToBottom();
                //收到的消息设置为已读
                this.markPrivateMessageAsRead();
              }
            }
          },
          onFailed: (error) => {
            //获取失败
            this.history.loading = false;
            console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
          },
        });
      },
      markPrivateMessageAsRead() {
        this.goEasy.im.markMessageAsRead({
          id: this.to.id,
          type: this.to.type,
          onSuccess: function () {
            console.log('标记私聊已读成功');
          },
          onFailed: function (error) {
            console.log('标记私聊已读失败', error);
          },
        });
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.$refs.scrollView.scrollTop = this.$refs.messageList.scrollHeight;
        });
      },
      renderMessageDate(message, index) {
        if (index === 0) {
          return this.formatDate(message.timestamp);
        } else {
          if (message.timestamp - this.history.messages[index - 1].timestamp > 5 * 60 * 1000) {
            return this.formatDate(message.timestamp);
          }
        }
        return '';
      },

      clickvipRank_0(){
        this.$message.error("需要升级为VIP会员才可发送文件!");
        setTimeout( () =>{
          this.$router.push('/topUpBuy');
        },1000)
        return
      },
      // 获取职位
      getPositionList(){
        let that = this;
        that.$axios.post('/api/company-interview/recruit/position/list',{
          company_id: localStorage.getItem('company_id')
        }).then(res =>{
          if(res.code == 0){
            this.positionList = res.data;
          }else{
            that.$message.error({
              message:res.msg
            })
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      // 获取个人信息
      getUserProfile(){
        let that = this;
        that.$axios.post('/api/staff/profile',{}).then(res =>{
          if(res.code == 0){
            that.userProfile = res.data;
          }else{
            that.$message.error({
              message:res.msg
            })
          }
        }).catch(e =>{
          console.log(e)
        })
      },
      // 点击常用语设置
      clickSetBtn(){
        this.cyy.visible = false;
        this.$router.push({
          path:'/individualCenter',
          query:{
            tabStatus: 'expressions'
          }
        })
      },
      // 点击头像查看简历
      clickAvatar(){
        let that = this;
        that.$axios.post('/api/company/resume/detail',{
          uid: that.friend.uid
        }).then( res =>{
          if(res.code == 0){
            that.userData = res.data;
            that.basic_info = res.data.basic_info;
            that.$refs.onlineResume._data.zx_dialogVisible = true;
          }else{
            that.$message.error({
              message:res.msg
            })
          }
        })
      },
      clickQuality(){
        this.$router.push({path:'/qualityResult'})
      },
      // 设置自定义消息 - 素质问答消息
      setQuality(){
        const payload = {
          contentType: "quality",
          url: "",
        };
        this.goEasy.im.createCustomMessage({
          type: 'quality',  // 自定义类型,不能添加image 
          payload,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
       // 点击面试邀请
      clickInterviewInvitation(){
        let that = this;
        let interviewData = that.interviewData;
        if(!interviewData.position || !interviewData.interview_time || !interviewData.staff || !interviewData.phone || !interviewData.interview_address){
          that.$message.error({
            message: '请先添加面试邀请信息！'
          })
          return
        }
        // 校验是否勾选素质问答
        if(that.qualityVal){
          this.setQuality();
        }
        let p = {
          company_id: localStorage.getItem('company_id') || '',
          uid: that.friend.uid,
          position_id: interviewData.position.id, // 面试职位id
          interview_time: interviewData.interview_time, // 面试时间
          staff: interviewData.staff, // 企业联系人
          phone: interviewData.phone, // 手机号
          interview_address: interviewData.interview_address, //地址
          remark: interviewData.remark, // 备注
        }

        that.$axios.post('/api/company-interview/create',p).then( res =>{
          if(res.code == 0){
            let userProfile = that.userProfile;
            let payload = {
              text: '邀请面试',
              interview_id: res.data.id, // 面试id
              company_id: p.company_id,
              position_id: p.position_id, // 职位id
              interview_time: p.interview_time,// 面试时间
              interview_address: p.interview_address, //地址
              remark: p.remark, // 备注
              staff: p.staff, // 企业联系人
              phone: p.phone, // 手机号
              position_name:that.interviewData.position.position_name,
              name: userProfile.staff_name,
              way_status: 1,  // 1. 向对方 发送邀请面试请求,2.用户同意面试邀请
              longitude: interviewData.longitude,
              latitude: interviewData.latitude,
            }
            that.goEasy.im.createCustomMessage({
              type: 'interview',  //字符串，可以任意自定义类型 面试邀请方式
              text: '邀请面试',
              payload,
              to: that.to,
              onSuccess: (message) => {
                that.sendMessage(message);
              },
              onFailed: (err) => {
                console.log("创建消息err:", err);
              }
            });
            that.yqmsVisible = false;
          }else{
            that.$message.error({
              message:res.msg
            })
          }
        })
      },
      // 点击发送出去的面试邀请信息
      clickInterview(i){
        console.log(i)
        this.ms_infoData = i.payload;
        this.ms_dialogVisible = true;
        this.initBaiduMap();
      },
      // 初始化百度地图
      initBaiduMap() {
        let that = this;
        this.$nextTick(function () {
          BaiduMap.init()
          .then((BMap) => {
          // 这个时候就可以访问到BMap了，
            /** 初始化地图Start */
            var map = new BMap.Map("baidu-msyq"); // 创建地图实例
            var point = new BMap.Point(that.ms_infoData.longitude,that.ms_infoData.latitude ); // 设置中心点坐标
            map.centerAndZoom(point, 13); // 地图初始化，同时设置地图展示级别
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            /** 初始化地图End */
            // 创建标注
            const marker = new BMap.Marker(point);

            // 将标注添加到地图中
            map.addOverlay(marker);
            /** 点击地图创建坐标事件Start */


          })
        });
      },
      ms_handleClose(){
        this.ms_dialogVisible = false;
      },
      // 腾讯云 语音自定义事件
      TUICallKitInfo(e){
        console.log(e)
        let txy_type = e.type;
        let text = e.text;
        // type:1、 正在语音； 2、正在视频；3、通话结束；4、视频结束;5、发起呼叫；6、呼叫失败
        let payload = {
          text,
          txy_type,
        }
        this.goEasy.im.createCustomMessage({
          type: 'TUICallKit',  //字符串，可以任意自定义类型 TUICallKit 腾讯云音视频
          text,
          payload,
          to: this.to,
          onSuccess: (message) => {
            console.log(message)
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },

    },
  };
</script>

<style scoped lang="scss">
  .chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .chat-title {
    height: auto;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .position-name{
    width: auto;
    display: flex;
    align-items: center;
  }
  .span-2{
    color: #37f;
  }
  .chat-title-l{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .chat-avatar {
    width: 35px;
    height: 35px;
  }

  .chat-name {
    width: auto;
    font-size: 15px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .chat-main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
    padding: 10px;
  }

  .chat-main::-webkit-scrollbar {
    width: 0;
  }

  .chat-main .history-loaded {
    text-align: center;
    font-size: 12px;
    color: #cccccc;
    line-height: 20px;
  }

  .chat-main .load {
    text-align: center;
    font-size: 12px;
    color: #d02129;
    line-height: 20px;
    cursor: pointer;
  }

  .history-loading {
    width: 100%;
    text-align: center;
  }

  .time-tips {
    color: #999;
    text-align: center;
    font-size: 12px;
    margin-top: 6px;
  }

  /* .message-list {
    padding: 0 10px;
  } */

  .message-item {
    display: flex;
  }

  .message-item-checkbox {
    height: 50px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .input-checkbox {
    position: relative;
  }

  .message-item-checkbox input[type="checkbox"]::before, .message-item-checkbox input[type="checkbox"]:checked::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    background: #FFFFFF;
    width: 20px;
    height: 20px;
    border: 1px solid #d02129;
    border-radius: 50%;
  }

  .message-item-checkbox input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #d02129;
    width: 20px;
    color: #FFFFFF;
    text-align: center;
    font-weight: bold;
  }

  .message-item-content {
    flex: 1;
    margin: 5px 0;
    overflow: hidden;
    display: flex;
  }

  .sender-info {
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .span-id{
    padding-top: 4px;
    font-size: 13px;
    font-weight: bold;
  }
  .sender-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  // .message-content {
  //   max-width: calc(100% - 100px);
  // }

  .message-payload {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .pending {
    background: url("../../../../assets/images/pending.gif") no-repeat center;
    background-size: 13px;
    width: 15px;
    height: 15px;
  }

  .send-fail {
    background: url("../../../../assets/images/failed.png") no-repeat center;
    background-size: 15px;
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }

  .message-read {
    color: gray;
    font-size: 12px;
    text-align: end;
    height: 16px;
    margin-top: 2px;
  }

  .message-unread {
    color: #d02129;
    font-size: 12px;
    text-align: end;
    height: 16px;
    margin-top: 2px;
  }

  .content-text {
    display: flex;
    align-items: center;
    text-align: left;
    background: #eeeeee;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 8px;
    margin: 3px 0;
    line-height: 25px;
    white-space: pre-line;
    overflow-wrap: anywhere;
    border-radius: 8px;
    word-break: break-all;
  }

  .content-image {
    display: block;
    cursor: pointer;
  }

  .content-image img {
    height: 100%;
  }

  .content-audio {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .content-audio .audio-facade {
    min-width: 12px;
    background: #eeeeee;
    border-radius: 7px;
    display: flex;
    font-size: 14px;
    padding: 8px;
    margin: 5px 0;
    line-height: 25px;
    cursor: pointer;
  }

  .content-audio .audio-facade-bg {
    background: url("../../../../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
  }

  .content-audio .audio-facade-bg.play-icon {
    background: url("../../../../assets/images/play.gif") no-repeat center;
    background-size: 20px;
  }

  .content-order {
    border-radius: 5px;
    border: 1px solid #eeeeee;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }

  .content-order .order-id {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }

  .content-order .order-body {
    display: flex;
    font-size: 13px;
    padding: 5px;
  }

  .content-order .order-img {
    width: 70px;
    height: 70px;
    border-radius: 5px;
  }

  .content-order .order-name {
    margin-left: 10px;
    width: 135px;
    color: #606164;
  }

  .content-order .order-count {
    font-size: 12px;
    color: #666666;
    flex: 1;
  }
  .content-interview{
    width: 240px;
    height: 65px;
    font-size: 15px;
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    color: #356ce9;
  }
  .content-file {
    width: 240px;
    height: 65px;
    font-size: 15px;
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .content-file:hover {
    background: #f1f1f1;
  }

  .file-info {
    width: 194px;
    text-align: left;
  }

  .file-name {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .file-size {
    font-size: 12px;
    color: #ccc;
  }

  .file-img {
    width: 40px;
    height: 40px;
  }

  .message-item .self {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }

  .message-item .self .audio-facade {
    flex-direction: row-reverse;
  }

  .message-item .self .audio-facade-bg {
    background: url("../../../../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .message-item .self .play-icon {
    background: url("../../../../assets/images/play.gif") no-repeat center;
    background-size: 20px;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .message-recalled {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 28px;
    font-size: 13px;
    text-align: center;
    color: grey;
    margin-top: 10px;
  }

  .message-recalled-self {
    display: flex;
  }

  .message-recalled-self span {
    margin-left: 5px;
    color: #D02129;
    cursor: pointer;
  }

  .chat-footer {
    border-top: 1px solid #dcdfe6;
    width: 100%;
    background: #FFFFFF;
  }

  .action-delete {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  .action-delete>div{
    cursor: pointer;
    font-size: 14px;
    padding: 20px;
    box-sizing: border-box;
  }
  .action-delete>div.delete-text{
    color: #ff0000;
  }
  .delete-btn {
    width: 25px;
    height: 25px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .action-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .action-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding: 6px 10px 0 10px; */
  }
  .action-bar-left{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .action-bar-right{
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .action-bar .action-item {
    text-align: left;
    padding: 4px 0;
    position: relative;
  }

  .action-bar .action-item .iconfont {
    font-size: 21px;
    margin: 0 6px 0 4px;
    z-index: 3;
    color: #606266;
    cursor: pointer;
  }

  .action-bar .action-item .iconfont:focus {
    outline: none;
  }

  .action-bar .action-item .iconfont:hover {
    color: #d02129;
  }

  .emoji-box {
    width: 210px;
    position: absolute;
    top: -111px;
    left: -11px;
    z-index: 2007;
    background: #fff;
    border: 1px solid #ebeef5;
    padding: 12px;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
    border-radius: 4px;
  }

  .emoji-item {
    width: 38px;
    height: 38px;
    margin: 0 2px;
  }

  .input-box {
    padding: 0 10px;
    flex: 1;
  }

  .input-content {
    border: none;
    resize: none;
    display: block;
    padding: 5px 0;
    box-sizing: border-box;
    width: 100%;
    color: #606266;
    outline: none;
    background: #FFFFFF;
    word-break: break-all;
    font-size: 14px;
  }

  .send-box {
    padding: 8px 20px;
    text-align: right;
  }

  .send-button {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border: 1px solid #d02129;
    background-color: #ffffff;
    color: #d02129;
    border-radius: 5px;
  }

  .action-popup {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #f6f6f607;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-popup-main {
    width: 150px;
    height: 120px;
    background: #ffffff;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 16px 0 #8b98a9;
    position: absolute;
  }

  .action-popup-main .action-item {
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: #262628;
    border-bottom: 1px solid #efefef;
    cursor: pointer;
  }

  .image-preview {
    max-width: 750px;
    max-height: 500px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9998;
  }

  .image-preview img {
    max-width: 750px;
    max-height: 500px;
  }

  .image-preview .close {
    font-size: 50px;
    line-height: 24px;
    cursor: pointer;
    color: #FFFFFF;
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 1002;
  }

  .order-box {
    width: 848px;
    position: absolute;
    left: -281px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2007;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(33, 33, 33, 0.7);
  }

  .order-list {
    width: 300px;
    background: #F1F1F1;
    border-radius: 5px;
  }

  .order-list .title {
    font-weight: 600;
    font-size: 15px;
    color: #000000;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order-list .title span {
    font-size: 28px;
    font-weight: 400;
    cursor: pointer;
  }

  .order-list .order-item {
    padding: 10px;
    background: #FFFFFF;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .order-list .order-id {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }

  .order-list .order-body {
    display: flex;
    font-size: 13px;
    justify-content: space-between;
  }

  .order-list .order-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .order-list .order-name {
    width: 160px;
  }

  .order-list .order-count {
    font-size: 12px;
    color: #666666;
    flex: 1;
  }
  .vline {
    display: inline-block;
    margin-right: 20px;
    margin-left: 0;
    margin-top: 5px;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 8px;
  }
  .toolbar-btn {
    height: 22px;
    border-radius: 4px;
    border: 1px solid #e6e8eb;
    padding: 0 10px;
    line-height: 23px;
    vertical-align: top;
    margin-right: 10px;
    box-sizing: content-box;
    cursor: pointer;
    position: relative;
    display: inline-block;
    font-size: 12px;
    overflow: hidden;
  }
  .unable {
    color: #999;
  }
    /*================ 常用语 样式  ↓  =================*/
    .sentence-panel{
    position: absolute;
    z-index: 15;
    bottom: 60px;
    left: 0;
    width: 400px;
    background: #fff;
    box-shadow: 0 3px 11px 0 rgba(0,0,0,.2);
    border-radius: 8px;
  }
  .sentence-panel .header {
    line-height: 34px;
    height: 34px;
    background: linear-gradient(90deg,#dee7fb,#fcfbfa);
    border-radius: 8px 8px 0 0;
    font-weight: 400;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sentence-panel .header .title {
    height: 16px;
    font-size: 13px;
    color: #666;
    line-height: 16px;
    padding: 0;
  }
  .sentence-panel .header .set-btn {
    font-size: 13px;
    color: #00a6a7;
    cursor: pointer;
  }
  .sentence-panel ul {
    overflow: auto;
    max-height: 180px;
    padding: 4px;
    background: #fff;
  }

  .sentence-panel:after {
    position: absolute;
    bottom: -5px;
    left: 14px;
    width: 10px;
    height: 10px;
    content: "";
    transform: rotate(135deg);
    background: #fff;
    box-shadow: 16px 3px 11px 0 rgba(0,0,0,.1);
  }

  .sentence-panel li {
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 12px 0 24px;
    font-size: 13px;
    font-weight: 400;
    color: #333;
    border: none;
    position: relative;
  }
  .sentence-panel li:before {
    content: "";
    position: absolute;
    top: 14px;
    left: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #d9d9d9;
  }
  /*================ 常用语 样式  ↑  =================*/

  /* ============ 交换联系方式  ↓ ==================*/
  .message-phone-box{
    width: auto;
    text-align: center;
    font-size: 13px;
    color: #d02129;
    padding: 10px;
  }
  .message-phone-universal-card{
    max-width: 260px;
    margin: 10px auto;
    background: #fff;
    border: 1px solid rgba(202,208,217,.7);
    border-radius: 6px;
  }
  .message-phone-universal-card-header{
    padding: 6px 16px;
    color: #356ce9;
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
    background: linear-gradient(270deg,#f2f6ff,rgba(227,236,255,.85));
    border-radius: 6px 6px 0 0;
  }
  .message-phone-universal-card-content{
    padding: 8px 16px;
    color: #222;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px
  }
  .message-phone-universal-card-footer {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
  .message-phone-universal-card-btn{
    flex: 1;
    width: auto;
    max-width: 90px;
    padding: 6px 10px;
    color: #222;
    font-size: 13px;
    text-align: center;
    border: 1px solid #cad0d9;
    border-radius: 16px;
    cursor: pointer;
  }
  .message-phone-universal-card-btn-main {
    color: #0058ff;
    border: 1px solid #0058ff;
  }

  /* ============ 交换联系方式  ↑ ==================*/
  .yqms-popup {
    // /deep/ .el-dialog__wrapper{
    //   z-index: 9999 !important;
    // }
    /deep/ .el-dialog{
      min-width: 420px;
      top: 50%;
      transform: translateY(-50%);
      margin-top: 0 !important;
      box-shadow: 0 0 16px 0 #99a5b4;
      .el-dialog__header{
        text-align: left;
        padding: 10px;
        .el-dialog__title{
          font-size: 15px;
          color: $g_textColor;
        }
        .el-dialog__headerbtn{
          top: 10px;
        }
      }
      .el-dialog__body{
        height: auto;
        overflow: hidden;
        padding: 20px 0;
        margin: 0 20px;
        border-top: 1px solid #F2F3F5;
        .cententinfo-box{
          width: 100%;
          .items-box{
            width: 100%;
            display: flex;
            margin-top: 10px;
            &:nth-of-type(1){
              margin-top: 0px;
            }
            .title{
              width: 106px;
              height: 24px;
              font-size: 14px;
              font-weight: 400;
              color: $g_textColor;
              line-height: 24px;
              &>span{
                color: #ff0000;
                font-size: 14px;
                font-weight: bold;
              }
            }
            & .el-select{
              position: relative;
              flex: 1;
              .el-select-dropdown{
                top: 96px !important;
                left: 96px !important;
              }
            }
            & .el-input__inner{
              height: 30px;
              line-height: 30px;
            }
            & .el-input{
              flex: 1;
              height: 30px;
              line-height: 30px;
            }
            & .el-input__icon{
              height: 30px;
              line-height: 30px;
            }
            & /deep/ .el-input.is-active .el-input__inner, & /deep/ .el-input__inner:focus{
              border-color: $g_bg;
            }
            & .el-textarea{
              flex: 1;
            }
            .icon-dt-box{
              display: flex;
              align-items: center;
              font-size: 13px;
              color: #adadad;
              cursor: pointer;
              &>img{
                width: 24px;
              }
              &>span{
                display: inline-block;
                line-height: 30px;
              }
            }
          }

        }
      }
      .el-button{
        padding: 0;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
      .el-button--primary{
        background-color: $g_color;
        border-color: $g_color;
      }


    }
  }
  .view-btn{
    cursor: pointer;
  }

  .container-zx /deep/ .el-dialog{
    min-width: 320px;
    max-height: 500px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    overflow: hidden;
    .el-dialog__header{
      text-align: left;
      padding: 10px 20px;
      .el-dialog__title{
        font-size: 16px;
        color: $g_textColor;
      }
      .el-dialog__headerbtn{
        top: 10px;
      }
    }
    .el-dialog__body{
      padding: 0px 10px;
      height: calc(100vh - 150px);
      overflow: overlay;
      .pc-preview-wrapper{
        border-radius: 4px;
        padding: 10px;
        color: $g_textColor;
        line-height: 26px;

        .box-items{
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 10px;
          &:nth-of-type(1){
            margin-top: 0;
          }
          .items{
            flex: 1;
            display: flex;
            align-items: center;
            .items-label{
              width: 80px;
              font-size: 14px;
              font-weight: bold;
              text-align: right;
            }
            .items-text{
              font-size: 14px;
              color: #414a60;
              padding-left: 4px;
            }

          }
          .items-l{
            justify-content: flex-start;
          }
          .items-r{
            justify-content: flex-end;
            .label-text{
              display: inline-block;
              vertical-align: middle;
              font-size: 13px;
              img{
                width: 14px;
                height: 14px;
              }
            }
            .vline {
              margin: 0 0.9rem;
            }
            .fz {
              margin-left: 5px;
              display: inline-block;
              width: 16px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>
