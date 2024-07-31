<template>


</template>

<script>
export default {
  components: {

  },
  data(){
    return{
      is_Notification: false,
      notificationList: []
    }
  },
  computed: {
   
  },
  watch:{
   
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    clickCloseNotificationBtn(){
      this.is_Notification = false;
    },
    getNotification(){
      let that = this;
      that.$axios.post('/api/system/notification/list',{}).then( res =>{
        if(res.code == 0){
          that.notificationList = res.data.list;
        }else{
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        that.$message.error({
          message:e.message
        })
        console.log(e)
      })
      
      },
  
  },
};
</script>

<style lang="scss" scoped>



</style>
