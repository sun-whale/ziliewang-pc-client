const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  realAvatar: state => state.user.realAvatar,
  name: state => state.user.name,
  staffAvatar: state => state.user.staffAvatar,
  staffName: state => state.user.staffName,
  role: state => state.user.role,
  unreadTotal: state => state.user.unreadTotal, // 及时通讯消息数
  notificationTotal: state => state.user.notificationTotal, // 系统通知消息数
  sidebar_show: state => state.user.sidebar_show,
  permission_routes: state => state.permission.routes,
  suer_TUStatusInfo: state => state.TUICallKit.suer_TUStatusInfo, // 人才端 腾讯云音视频状态数据
  TUStatusInfo: state => state.TUICallKit.TUStatusInfo, // 企业端 腾讯云音视频状态数据

}
export default getters
