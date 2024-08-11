<template>
  <div class="chat-container">
    <div class="chat-title">
      <div class="chat-title-l">
        <img
          :src="
            friend.avatar
              ? friend.avatar
              : require('../../../../assets/image/img-user.jpg')
          "
          class="chat-avatar"
          :class="friend.company_id ? 'hover' : ''"
          @click="clickFriendAvatar"
        />
        <div class="chat-name">{{ friend.name }}</div>
      </div>
      <div class="position-name">
        <!-- <span class="span-1">沟通岗位：</span> -->
        <span class="span-2">{{ friend.position_name }}</span>
      </div>
    </div>
    <div class="chat-main" ref="scrollView">
      <div class="message-list" ref="messageList">
        <div v-if="history.loading" class="history-loading">
          <img src="../../../../assets/images/pending.gif" />
        </div>
        <div
          v-else
          :class="history.allLoaded ? 'history-loaded' : 'load'"
          @click="loadHistoryMessage(false)"
        >
          {{ history.allLoaded ? "已经没有更多的历史消息" : "获取历史消息" }}
        </div>
        <div v-for="(item, index) in history.messages" :key="index">
          <!-- 时间 -->
          <div class="time-tips">{{ renderMessageDate(item, index) }}</div>

          <div class="message-recalled" v-if="item.recalled">
            <div v-if="item.senderId !== currentUser.id">
              {{ friend.name }}撤回了一条消息
            </div>
            <div v-else class="message-recalled-self">
              <div>你撤回了一条消息</div>
              <span
                v-if="item.type === 'text'"
                @click="editRecalledMessage(item.payload.text)"
                >重新编辑</span
              >
            </div>
          </div>
          <!-- 内容区域 开始 -->
          <div class="message-item" v-if="!item.recalled">
            <!-- 多选按钮 -->
            <div
              class="message-item-checkbox"
              v-if="messageSelector.visible && item.status !== 'sending'"
            >
              <input
                class="input-checkbox"
                type="checkbox"
                :value="item.messageId"
                v-model="messageSelector.ids"
                @click="selectMessages"
              />
            </div>

            <div
              class="message-item-content"
              :class="{ self: item.senderId === currentUser.id }"
            >
              <!-- 头像 开始 -->
              <div
                class="sender-info"
                @click="clickUserImage(0)"
                v-if="currentUser.id === item.senderId"
              >
                <img
                  :src="
                    currentUser.avatar
                      ? currentUser.avatar
                      : require('../../../../assets/image/img-user.jpg')
                  "
                  class="sender-avatar"
                />
                <!-- <span class="span-id">ID: {{ user_number  }}</span> -->
              </div>
              <div class="sender-info" v-else @click="clickUserImage(friend)">
                <img
                  :src="
                    friend.avatar
                      ? friend.avatar
                      : require('../../../../assets/image/img-user.jpg')
                  "
                  class="sender-avatar"
                />
                <!-- <span class="span-id">ID: {{ friend.user_number }}</span> -->
              </div>
              <!-- 头像 结束 -->

              <div
                class="message-content"
                @contextmenu.prevent.stop="(e) => showActionPopup(item, $event)"
              >
                <!-- <div class="message-content"> -->
                <div class="message-payload">
                  <!-- 加载中 icon -->
                  <div class="pending" v-if="item.status === 'sending'"></div>
                  <!--  发送失败 icon -->
                  <div class="send-fail" v-if="item.status === 'fail'"></div>

                  <!-- 内容 开始 -->
                  <div
                    v-if="item.type === 'text'"
                    class="content-text"
                    style="flex-direction: column"
                  >
                    <div style="min-width: 60px">
                      <div
                        v-html="emoji.decoder.decode(item.payload.text)"
                      ></div>
                    </div>
                    <div class="fz-box" v-if="currentUser.id === item.senderId">
                      <i
                        class="el-icon-connection"
                        title="引用"
                        style="cursor: pointer"
                        @click="clickReply(item)"
                      ></i>
                      <i
                        class="el-icon-warning-outline"
                        title="举报"
                        style="cursor: pointer; margin: 0 4px"
                        @click="clickReport(item)"
                      ></i>
                      <img
                        src="../../../../assets/image/icon-fz.png"
                        title="复制"
                        style="margin-left: 0"
                        @click="clickCopy(item.payload.text)"
                      />
                    </div>
                    <div class="fz-box" v-else>
                      <img
                        src="../../../../assets/image/icon-fz.png"
                        title="复制"
                        alt=""
                        @click="clickCopy(item.payload.text)"
                      />
                      <i
                        class="el-icon-warning-outline"
                        title="举报"
                        style="cursor: pointer; margin-right: 4px"
                        @click="clickReport(item)"
                      ></i>
                      <i
                        class="el-icon-connection"
                        title="引用"
                        style="cursor: pointer"
                        @click="clickReply(item)"
                      ></i>
                    </div>
                  </div>
                  <!-- 内容 结束 -->
                  <!-- 引用内容 开始 -->
                  <div v-if="item.type === 'texts'" style="position: relative">
                    <div class="content-text" style="flex-direction: column">
                      <div
                        v-html="emoji.decoder.decode(item.payload.text)"
                      ></div>
                    </div>
                    <div style="font-size: 12px; color: #555; margin: 4px 0">
                      <div
                        style="message-quote"
                        v-html="emoji.decoder.decode(item.payload.quote)"
                      ></div>
                    </div>
                  </div>
                  <!-- 引用内容 结束 -->
                  <!-- 音视频 开始 -->
                  <div
                    v-if="item.type === 'TUICallKit'"
                    class="content-text"
                    v-html="item.payload.text"
                  ></div>
                  <!-- 音视频 结束 -->
                  <!-- 简历 开始 -->
                  <a
                    v-if="item.type === 'resume'"
                    :href="item.payload.resume"
                    target="_blank"
                    download="download"
                  >
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">个人简历</span>
                      </div>
                      <img
                        class="file-img"
                        src="../../../../assets/image/icon-zxjl.png"
                      />
                    </div>
                  </a>
                  <!-- 简历 结束 -->
                  <!-- 职业身份卡片 开始 -->
                  <div
                    v-if="item.type === 'share-card'"
                    class="share-card"
                    @click="clickShare(item.payload.url)"
                  >
                    <img :src="item.payload.userMessage.avatar" />
                    <div>
                      <div class="share-title">
                        {{ item.payload.userMessage.name }}
                      </div>
                      <div class="share-tips">
                        {{ item.payload.userMessage.position || "--" }}
                      </div>
                    </div>
                    <div class="tips">好友卡片</div>
                  </div>
                  <!-- 职业身份卡片 结束 -->
                  <!-- 岗位卡片 开始 -->
                  <div
                    v-if="item.type === 'share-post'"
                    class="share-card"
                    @click="clickShare(item.payload.url)"
                  >
                    <img :src="item.payload.userMessage.avatar" />
                    <div>
                      <div class="share-title">
                        {{ item.payload.userMessage.company_name }}
                      </div>
                      <div class="share-tips">
                        {{ item.payload.userMessage.job_preference || "--" }}
                      </div>
                    </div>
                    <div class="tips">职位卡片</div>
                  </div>
                  <!-- 岗位卡片 结束 -->
                  <!-- 面试邀请 开始 -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'interview' && item.payload.way_status == 1
                    "
                  >
                    <h4 class="message-phone-universal-card-header">
                      面试邀请
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <div>
                        <span>面试岗位：</span
                        ><span>{{
                          item.payload.position_name
                            ? item.payload.position_name
                            : ""
                        }}</span>
                      </div>
                      <div>
                        <span>面试时间：</span
                        ><span>{{
                          item.payload.interview_time
                            ? item.payload.interview_time
                            : ""
                        }}</span>
                      </div>
                      <div>
                        <span>面试地址：</span
                        ><span>{{
                          item.payload.interview_address
                            ? item.payload.interview_address
                            : ""
                        }}</span>
                      </div>
                    </div>
                    <div class="message-phone-universal-card-footer">
                      <div
                        class="message-phone-universal-card-btn-main message-phone-universal-card-btn"
                        @click="getUserIinterviewInvite(3, item.payload)"
                      >
                        同意
                      </div>
                      <div
                        class="message-phone-universal-card-btn-main message-phone-universal-card-btn"
                        @click="getUserIinterviewInvite(2, item.payload)"
                      >
                        拒绝
                      </div>
                    </div>
                  </div>
                  <!-- 面试邀请 结束 -->
                  <!-- 同意面试邀请 开始 -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'interview' && item.payload.way_status == 3
                    "
                  >
                    <h4
                      class="message-phone-universal-card-header color-ff0000"
                    >
                      同意了面试邀请
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <div>
                        <span>面试岗位：</span
                        ><span>{{
                          item.payload.position_name
                            ? item.payload.position_name
                            : ""
                        }}</span>
                      </div>
                      <div>
                        <span>面试时间：</span
                        ><span>{{
                          item.payload.interview_time
                            ? item.payload.interview_time
                            : ""
                        }}</span>
                      </div>
                      <div>
                        <span>面试地址：</span
                        ><span>{{
                          item.payload.interview_address
                            ? item.payload.interview_address
                            : ""
                        }}</span>
                      </div>
                    </div>
                    <div class="message-phone-universal-card-footer">
                      <span class="span-ckms" @click.stop="clickInterview(item)"
                        >查看面试信息</span
                      >
                    </div>
                  </div>
                  <!-- 同意面试邀请 结束 -->
                  <!-- 拒绝面试邀请 开始 -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'interview' && item.payload.way_status == 2
                    "
                  >
                    <h4 class="message-phone-universal-card-header">
                      面试邀请
                    </h4>
                    <div class="message-phone-universal-card-footer">
                      <span class="color-ff0000">拒绝了面试邀请</span>
                    </div>
                  </div>
                  <!-- 拒绝面试邀请 结束 -->
                  <!-- 人才 发送请求联系方式 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="item.type === 'phone' && item.payload.way_status == 1"
                  >
                    <h4 class="message-phone-universal-card-header">
                      联系方式
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的手机号：{{ item.payload.real_phone }}</span>
                    </div>
                    <div class="message-phone-box">
                      您已向对方发送交换联系方式
                    </div>
                  </div>
                  <!-- 人才 发送请求联系方式 ↑ -->
                  <!-- boss 发送过来的联系方式手机号 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="item.type === 'phone' && item.payload.way_status == 2"
                  >
                    <h4 class="message-phone-universal-card-header">
                      联系方式
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span
                        >{{ item.payload.name }}的手机号：{{
                          item.payload.phone
                        }}</span
                      >
                    </div>
                  </div>
                  <!-- boss 发送过来的联系方式手机号 ↑ -->
                  <!-- 人才 同意对方索要联系方式 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="item.type === 'phone' && item.payload.way_status == 3"
                  >
                    <h4 class="message-phone-universal-card-header">
                      联系方式
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的手机号：{{ item.payload.real_phone }}</span>
                    </div>
                    <div class="message-phone-box">
                      您已同意对方交换联系方式
                    </div>
                  </div>
                  <!-- 人才 同意对方索要联系方式  ↑ -->
                  <!-- 素质测评 开始 -->
                  <div v-if="item.type === 'quality'">
                    <h4 class="message-phone-universal-card-header">
                      对方请求填写素质测评邀请
                    </h4>
                    <div
                      class="message-phone-box view-btn"
                      style="cursor: pointer"
                      @click.stop="clickQuality(item)"
                    >
                      立即填写
                    </div>
                  </div>
                  <!-- 素质测评 结束 -->

                  <!-- 面试评估 开始 -->
                  <div v-if="item.type === 'assess'">
                    <h4 class="message-phone-universal-card-header">
                      对方请求填写面试评估邀请
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <div
                        v-for="(items, index) in item.payload.assessList"
                        :key="index"
                      >
                        <span>问题{{ index + 1 }}：</span
                        >{{
                          items.question ? items.question : items.title || ""
                        }}
                      </div>
                      <div
                        class="message-phone-box view-btn"
                        style="cursor: pointer"
                        @click.stop="clickAssess()"
                      >
                        立即填写
                      </div>
                    </div>
                  </div>
                  <!-- 面试评估 结束 -->

                  <!-- boss 索要手机号 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="item.type === 'phone' && item.payload.way_status == 4"
                  >
                    <h4 class="message-phone-universal-card-header">
                      对方请求交换联系方式
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span>对方手机号：{{ item.payload.phone }}</span>
                    </div>

                    <div class="message-phone-universal-card-footer">
                      <div
                        class="message-phone-universal-card-btn-main message-phone-universal-card-btn"
                        @click="clickPhoneWechatBtn(2, 3, 'phone', item)"
                      >
                        同意交换
                      </div>
                    </div>
                  </div>
                  <!-- boss 索要手机号 ↑ -->

                  <!-- 交换微信功能展示 ↓   -->
                  <!-- 人才 发送请求交换微信 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'wechat' && item.payload.way_status == 1
                    "
                  >
                    <h4 class="message-phone-universal-card-header">
                      交换微信
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的微信号：{{ item.payload.wechat_number }}</span>
                    </div>
                    <div class="message-phone-box">您已向对方发送交换微信</div>
                  </div>
                  <!-- 人才 发送请求交换微信 ↑ -->
                  <!-- boss 发送过来的微信 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'wechat' && item.payload.way_status == 2
                    "
                  >
                    <h4 class="message-phone-universal-card-header">
                      交换微信
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span
                        >{{ item.payload.name }}的微信：{{
                          item.payload.wechat_number
                        }}</span
                      >
                    </div>
                  </div>
                  <!-- boss 发送过来的微信 ↑ -->
                  <!-- 人才 同意对方索要微信 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'wechat' && item.payload.way_status == 3
                    "
                  >
                    <h4 class="message-phone-universal-card-header">
                      交换微信
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span>您的微信：{{ item.payload.wechat_number }}</span>
                    </div>
                    <div class="message-phone-box">您已同意对方交换微信</div>
                  </div>
                  <!-- 人才 同意对方索要微信  ↑ -->
                  <!-- boss 索要微信 ↓ -->
                  <div
                    class="message-phone-universal-card"
                    v-if="
                      item.type === 'wechat' && item.payload.way_status == 4
                    "
                  >
                    <h4 class="message-phone-universal-card-header">
                      对方请求交换微信
                    </h4>
                    <div class="message-phone-universal-card-content">
                      <span>对方微信：{{ item.payload.wechat_number }}</span>
                    </div>

                    <div class="message-phone-universal-card-footer">
                      <div
                        class="message-phone-universal-card-btn-main message-phone-universal-card-btn"
                        @click="clickPhoneWechatBtn(2, 3, 'wechat', item)"
                      >
                        同意交换
                      </div>
                    </div>
                  </div>
                  <!-- boss 索要微信 ↑ -->
                  <!-- 交换微信功能展示 ↑   -->

                  <!-- 图片 开始 -->
                  <div
                    v-if="item.type === 'image' || item.type === 'images'"
                    class="content-image"
                    @click="showImagePreviewPopup(item.payload.url)"
                  >
                    <img
                      :src="item.payload.url"
                      :style="{
                        height:
                          getImageHeight(
                            item.payload.width,
                            item.payload.height
                          ) + 'px',
                      }"
                    />
                  </div>
                  <!-- 图片 结束 -->

                  <!-- 文件 开始 -->
                  <a
                    v-if="item.type === 'file'"
                    :href="item.payload.url"
                    target="_blank"
                    download="download"
                  >
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">{{ item.payload.name }}</span>
                        <span class="file-size"
                          >{{ (item.payload.size / 1024).toFixed(2) }}KB</span
                        >
                      </div>
                      <img
                        class="file-img"
                        src="../../../../assets/images/file-icon.png"
                      />
                    </div>
                  </a>
                  <!-- 文件 结束 -->
                  <!-- 视频 开始 -->
                  <goeasy-video-player
                    v-if="item.type === 'video'"
                    :thumbnail="item.payload.thumbnail"
                    :src="item.payload.video.url"
                  />
                  <!-- 视频 结束 -->
                </div>
                <div
                  v-if="currentUser.id === item.senderId"
                  :class="item.read ? 'message-read' : 'message-unread'"
                >
                  <div v-if="item.senderId === currentUser.id">
                    {{ item.read ? "已读" : "未读" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 内容区域 结束 -->
        </div>
      </div>
    </div>
    <div
      class="chat-footer"
      :style="`min-height:${is_pop == 'pop' ? '120' : '140'}px;`"
    >
      <div class="action-delete" v-if="messageSelector.visible">
        <!-- <img class="delete-btn" src="../../../../assets/images/delete.png" @click="deleteMultipleMessages"/> -->
        <div @click="cancelMultipleMessages">取消选择</div>
        <div class="delete-text" @click="deleteMultipleMessages">删除</div>
      </div>
      <div class="action-box">
        <div class="action-bar">
          <div class="action-bar-left">
            <!-- 常用语 -->
            <div class="action-item">
              <div v-if="cyy.visible" class="sentence-panel">
                <div class="header">
                  <h3 class="title">常用语</h3>
                  <a href="javascript:0;" class="set-btn" @click="clickSetBtn"
                    >设置</a
                  >
                </div>
                <ul>
                  <li
                    v-for="(item, index) in phraseslist"
                    :key="index"
                    @click="clickCyy(item.common_language)"
                  >
                    {{ item.common_language }}
                  </li>
                </ul>
              </div>
              <i
                class="iconfont icon-changyongyu"
                title="常用语"
                @click="showCyyBox"
              ></i>
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
              <label @click="clickvipRank_0" v-else>
                <i class="iconfont icon-tupian" title="图片"></i>
              </label>
              <input
                v-show="false"
                id="img-input"
                accept="image/*"
                multiple
                type="file"
                @change="sendImageMessage"
              />
            </div>
            <!-- 视频 -->
            <!-- <div class="action-item">
              <label for="video-input"><i class="iconfont icon-film" title="视频"></i></label>
              <input v-show="false" id="video-input" accept="video/*" type="file"
                    @change="sendVideoMessage"/>
            </div> -->
            <!-- 文件 -->
            <div class="action-item">
              <label @click="clickvipRank_0">
                <i class="iconfont icon-wenjianjia" title="文件"></i>
              </label>
              <input
                v-show="false"
                id="file-input"
                type="file"
                @change="sendFileMessage"
              />
            </div>
            <i class="vline"></i>
            <div
              class="btn-resume toolbar-btn unable"
              title="发送简历"
              @click="clickDeliver('resume')"
            >
              发简历
            </div>
            <div
              class="btn-resume toolbar-btn unable"
              title="交换联系方式"
              @click="clickPhoneWechatBtn(1, 1, 'phone')"
            >
              联系方式
            </div>
            <div
              class="btn-resume toolbar-btn unable"
              title="交换微信"
              @click="clickPhoneWechatBtn(1, 1, 'wechat')"
            >
              换微信
            </div>
          </div>
          <div class="action-bar-right">
            <div class="action-item" style="position: relative; z-index: 999">
              <i
                class="el-icon-scissors"
                style="font-size: 18px; margin-right: 6px"
                title="截图"
                @click="clickScreenShot()"
              ></i>
            </div>
            <div class="action-item">
              <i
                class="iconfont icon-dianhua"
                title="电话"
                @click="user_clickCall(1)"
              ></i>
            </div>
            <div class="action-item">
              <i
                class="iconfont icon-shipin"
                title="视频"
                @click="user_clickCall(2)"
              ></i>
            </div>
          </div>
        </div>

        <!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
        <div class="input-box" @click.stop="clickInput">
          <textarea
            ref="input"
            @focus="onInputFocus"
            @keyup.enter="sendTextMessage"
            placeholder="输入内容...."
            v-model="text"
            maxlength="700"
            class="input-content"
          ></textarea>
          <!-- 引用的消息 -->
          <div
            class="reply-message"
            style="width: 450px"
            v-if="quoteMessageShow"
          >
            <div style="width: 420px">{{ quoteMessage }}</div>
            <i class="el-icon-circle-close" @click="clickCliseMessage"></i>
          </div>
        </div>
        <div class="send-box">
          <button class="send-button" @click="sendTextMessage">发送</button>
        </div>
      </div>
    </div>
    <!-- 语音播放器 -->
    <!-- <audio ref="audioPlayer" @ended="onAudioPlayEnd" @pause="onAudioPlayEnd"></audio> -->
    <!-- 图片预览弹窗 -->
    <div v-if="imagePreview.visible" class="image-preview">
      <img :src="imagePreview.url" alt="图片" />
      <span class="close" @click="hideImagePreviewPopup">×</span>
    </div>
    <!-- 消息删除撤回弹窗 -->
    <div
      class="action-popup"
      v-if="actionPopup.visible"
      @click="actionPopup.visible = false"
    >
      <div class="action-popup-main" :style="`top:${topY}px;left:${leftX}px;`">
        <div class="action-item" @click="deleteSingleMessage">删除</div>
        <div
          class="action-item"
          v-if="actionPopup.recallable"
          @click="recallMessage"
        >
          撤回
        </div>
        <div class="action-item" @click="showCheckBox">多选</div>
        <div class="action-item" @click="showCancel">取消</div>
      </div>
    </div>
    <!-- 查看面试邀请详情----弹窗 -->
    <div class="container-zx">
      <el-dialog
        :title="ms_infoData.text"
        :center="false"
        :visible.sync="ms_dialogVisible"
        width="600px"
        :before-close="ms_handleClose"
      >
        <div class="pc-preview-wrapper">
          <div class="talent-box">
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试岗位：</div>
                <div class="items-text">
                  {{
                    ms_infoData.position_name ? ms_infoData.position_name : ""
                  }}
                </div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">投递人：</div>
                <div class="items-text">
                  {{ ms_infoData.name ? ms_infoData.name : "暂无" }}
                </div>
              </div>
            </div>
            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">联系电话：</div>
                <div class="items-text">
                  {{ ms_infoData.phone ? ms_infoData.phone : "暂无" }}
                </div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试时间：</div>
                <div class="items-text">
                  {{
                    ms_infoData.interview_time
                      ? ms_infoData.interview_time
                      : "暂无"
                  }}
                </div>
              </div>
            </div>
            <div class="box-items" v-if="ms_infoData.remark">
              <div class="items items-l">
                <div class="items-label">备注：</div>
                <div class="items-text">
                  {{ ms_infoData.remark ? ms_infoData.remark : "" }}
                </div>
              </div>
            </div>

            <div class="box-items">
              <div class="items items-l">
                <div class="items-label">面试地址：</div>
                <div class="items-text">
                  {{
                    ms_infoData.interview_address
                      ? ms_infoData.interview_address
                      : ""
                  }}
                </div>
              </div>
            </div>
            <div id="baidu-msyq" style="width: 560px; height: 340px"></div>
          </div>
        </div>
      </el-dialog>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogAssess"
      width="30%"
      :before-close="handleClose"
    >
      <span style="font-size: 15px; color: #666; line-height: 24px">
        请在开始后30分钟内完成测评，中途不能暂停，测评过程中需要打开摄像头，系统会自动录像和录制电脑操作的测评过程中的屏幕，请注意个人隐私保护，并认真阅读个人隐私政策，测评完成系统会将录制的视频和测评结果上传发送至招聘企业
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAssess = false">取 消</el-button>
        <el-button type="primary" @click="clickGoAssess">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看企业信息弹窗 -->
    <!-- <div id="enterprise-info-box">
      <el-dialog title="企业信息"
        :center="false"
        :visible.sync="en_dialogVisible"
        width="940px"
        :before-close="handleEnClose">
        <div class="enterprise-info-box m-box">
          <companyDetails :id="en_company_id" v-if="en_company_id"/>
        </div>
      </el-dialog>
     </div> -->

    <Complaint
      ref="complaint"
      states="0"
      :id="complaintData.id"
      :uId="complaintData.uid"
      pdiTop="20px"
      zIndex="1000"
    />
  </div>
</template>

<script>
import Complaint from "@/components/complaint";
import { formatDate } from "../../../../utils/utils.js";
import EmojiDecoder from "../../../../utils/EmojiDecoder";
import GoeasyVideoPlayer from "../../../../components/GoEasyVideoPlayer";
import BaiduMap from "../../../../utils/map.js";
import ScreenShot from "js-web-screen-shot";
// import companyDetails from "../../companyDetails"
const IMAGE_MAX_WIDTH = 200;
const IMAGE_MAX_HEIGHT = 150;
export default {
  name: "PrivateChat",
  components: {
    GoeasyVideoPlayer,
    Complaint,
    // companyDetails
  },
  props: {
    infoData: {
      type: Object,
      default() {
        return {};
      },
    },
    is_pop: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    const emojiUrl = "https://imgcache.qq.com/open/qcloud/tim/assets/emoji/";
    const emojiMap = {
      "[么么哒]": "emoji_3@2x.png",
      "[乒乓]": "emoji_4@2x.png",
      "[便便]": "emoji_5@2x.png",
      "[信封]": "emoji_6@2x.png",
      "[偷笑]": "emoji_7@2x.png",
      "[傲慢]": "emoji_8@2x.png",
    };
    return {
      complaintData: { id: "", uid: "" },
      quoteMessage: "",
      quoteMessageShow: false,
      leftX: 0,
      topY: 0,
      payloadId: "",
      dialogAssess: false,
      userVipRank: localStorage.getItem("userVipRank") || 0,
      sessionList: [], // 会话记录列表
      detailData: {}, // 职位信息
      userProfile: {}, // 个人信息
      phraseslist: [], // 常用语
      currentUser: null,
      friend: null,
      uid: localStorage.getItem("realUid"),
      user_number: localStorage.getItem("user_number"),
      to: {}, //用于创建消息时传入

      history: {
        messages: [],
        allLoaded: false,
        loading: true,
      },

      text: "",

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
        url: "",
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
        ids: [],
      },
      yqms_tag: 1, // 面试邀请 3、 同意 2、拒绝
      //查看面试信息弹窗
      ms_dialogVisible: false,
      ms_infoData: {},
      en_dialogVisible: false,
      en_company_id: "",
    };
  },
  watch: {
    "$store.state.user.realAvatar"(newVal) {
      this.realAvatar = newVal;
      this.$forceUpdate(); // 更新数据
    },
    "$store.state.user.name"(newVal) {
      this.name = newVal;
      this.$forceUpdate(); // 更新数据
    },
    "$store.state.TUICallKit.suer_TUStatusInfo"(newVal) {
      this.user_TUICallKitInfo(newVal);
      this.$forceUpdate(); // 更新数据
    },
  },
  mounted() {
    this.currentUser = {
      // 我的信息--展示
      id: "u_" + localStorage.getItem("realUid"),
      name: this.$store.state.user.name,
      avatar: this.$store.state.user.realAvatar,
    };
  },
  created() {
    let that = this;
    that.userVipRank = localStorage.getItem("userVipRank");
    that.friend = that.infoData; // 目标用户信息
    that.to = {
      // 目标用户
      type: that.GoEasy.IM_SCENE.PRIVATE,
      id: that.friend.id,
      data: {
        uid: that.friend.uid,
        name: that.friend.name,
        avatar: that.friend.avatar,
        is_friend: that.friend.is_friend,
        user_number: that.friend.user_number,
      },
    };
    // 获取历史记录
    this.loadHistoryMessage(true);

    this.goEasy.im.on(
      this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED,
      this.onReceivedPrivateMessage
    ); // 监听消息

    this.listenConversationUpdate(); //监听会话列表变化
    this.loadConversations(); //加载会话列表
    // 获取个人信息
    this.getUserProfile();
  },
  beforeDestroy() {
    this.goEasy.im.off(
      this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED,
      this.onReceivedPrivateMessage
    );
    this.goEasy.im.off(
      this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED,
      this.renderConversations
    );
  },
  methods: {
    // 删除引用消息
    clickCliseMessage() {
      this.quoteMessageShow = false;
      this.quoteMessage = "";
    },
    // 点击企业端头像
    clickFriendAvatar() {
      let friend = this.friend;
      if (friend.company_id) {
        this.$router.push({
          path: "/companyDetails", //跳转的路径
          query: {
            //路由传参时push和query搭配使用 ，作用时传递参数
            id: friend.company_id,
          },
        });
        // this.en_company_id= '';
        // this.$nextTick( ()=>{
        //   this.en_company_id = friend.company_id;
        //   this.en_dialogVisible = true;
        // })
      }
    },
    handleEnClose() {
      this.en_company_id = "";
      this.en_dialogVisible = false;
    },
    // 点击头像跳转页面
    clickUserImage(type) {
      if (type == 0) {
        // 个人主页
        this.$router.push({ path: "/careerIdentity" });
      } else {
        // 判断是好友还是职位人
        if (type.position_id) {
          this.$router.push({
            path: "/JobDetails", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              id: type.position_id,
            },
          });
        } else {
          this.$router.push({
            path: "/careerIdentity", //跳转的路径
            query: {
              //路由传参时push和query搭配使用 ，作用时传递参数
              see_uid: type.uid,
            },
          });
        }
      }
    },
    clickShare(url) {
      this.$router.push(url);
    },
    // 点击聊天框内复制图标
    async clickCopy(text) {
      // var payload = {
      //   contentType: "share-card",
      //   userMessage: {
      //     name:'彭讲建',
      //     position: '高级产品经理',
      //     avatar: "https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20240112/076b2bdc935b0110afa3221afedc7697.png",
      //   },
      //   url: '/careerIdentity?see_uid=10'
      // };
      // var payload = {
      //   contentType: "share-post",
      //   userMessage: {
      //     company_name:'湖北省佰豪聚富商贸有限公司安徽分公司',
      //     job_preference: '高级产品经理',
      //     avatar: "https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20240402/89cb1ca3ddf4b171bee2139a049a249b.png",
      //   },
      //   url: '/JobDetails?id=85'
      // };
      // this.goEasy.im.createCustomMessage({
      //   type: 'share-post',  // 自定义类型,不能添加image
      //   payload,
      //   to: this.to,
      //   onSuccess: (message) => {
      //     this.quoteMessage = "";
      //     this.quoteMessageShow = false;
      //     this.sendMessage(message);
      //   },
      //   onFailed: (err) => {
      //     console.log("创建消息err:", err);
      //   }
      // });
      console.log(text);
      try {
        const textToCopy = text;
        await navigator.clipboard.writeText(textToCopy);
        this.$message.success({
          message: "复制成功!",
        });
      } catch (error) {
        this.$message.error({
          message: "复制失败!",
        });
      }
    },
    // 点击聊天框内的举报
    clickReport(item) {
      let senderList = item.senderId.split("_");
      let receiverList = item.receiverId.split("_");
      this.complaintData.id = receiverList[1];
      this.complaintData.uid = senderList[1];
      this.zx_dialogVisible = false;
      this.$refs.complaint._data.states = "2";
      this.$refs.complaint._data.isComplaint = true;
      this.$refs.complaint.setComplaintType();
    },
    // 点击聊天框内的引用
    clickReply(item) {
      if (item.senderId == "u_" + localStorage.getItem("realUid")) {
        this.quoteMessage = "我:" + item.payload.text;
      } else {
        this.quoteMessage = this.friend.name + ":" + item.payload.text;
      }
      this.quoteMessageShow = true;
      console.log(this.quoteMessage);
    },
    // 发送引用消息
    setQuoteMessage() {
      var payload = {
        contentType: "texts",
        text: this.text,
        quote: this.quoteMessage,
      };
      this.goEasy.im.createCustomMessage({
        type: "texts", // 自定义类型,不能添加image
        payload,
        to: this.to,
        onSuccess: (message) => {
          this.quoteMessage = "";
          this.quoteMessageShow = false;
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    // 发送截图消息
    async screenshotMessage(image) {
      var payload = {
        contentType: "image/jpeg",
        url: image,
      };

      this.goEasy.im.createCustomMessage({
        type: "images", // 自定义类型,不能添加image
        payload,
        to: this.to,
        onSuccess: (message) => {
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    // 上传图片到服务器
    uploadFile(base64String) {
      const that = this;
      // 将base64 转成FormData文件格式上传
      var bytes = window.atob(base64String.split(",")[1]);
      var array = [];
      for (var i = 0; i < bytes.length; i++) {
        array.push(bytes.charCodeAt(i));
      }
      var blob = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
      var formData = new FormData();
      // --end--
      formData.append("file[]", blob, Date.now() + ".jpg");
      formData.append("up_tag", "other");
      formData.append("pictureCategory", "articleCover");
      console.log(formData);
      that.$axios
        .post("/api/upload", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          that.screenshotMessage(res.data.upload_files);
        })
        .catch((e) => {
          that.$message.error({
            message: "系统繁忙，请稍后重试",
          });
        });
    },
    // 面试评估
    clickAssess() {
      this.$router.push({ path: "/interviewAssess" });
    },
    clickGoAssess() {
      this.dialogAssess = false;
      this.$router.push({ path: "/qualityTest?id" + this.payloadId });
    },
    // 素质测评
    clickQuality(item) {
      // 提示
      this.dialogAssess = !this.dialogAssess;
      this.payloadId = item.payload.id;
    },
    // 截图
    clickScreenShot() {
      // 截图确认按钮回调函数
      const that = this;
      const callback = ({ base64, cutInfo }) => {
        that.uploadFile(base64);
      };
      // 截图取消时的回调函数
      const closeFn = (err) => {
        console.log("截图窗口关闭" + err);
      };
      // eslint-disable-next-line no-new
      new ScreenShot({
        enableWebRtc: true,
        completeCallback: callback,
        closeCallback: closeFn,
      });
      console.log(1);
    },
    // 点击电话、视频按钮
    user_clickCall(t) {
      this.$bus.$emit("user_clickCall", {
        to: this.to,
        currentUser: this.currentUser,
        type: t,
      });
    },
    formatDate,
    onReceivedPrivateMessage(message) {
      if (message.senderId === this.friend.id) {
        this.history.messages.push(message);
        this.markPrivateMessageAsRead();
      }
      this.scrollToBottom();
    },
    loadConversations() {
      this.goEasy.im.latestConversations({
        onSuccess: (result) => {
          let content = result.content;
          this.renderConversations(content);
        },
        onFailed: (error) => {
          console.log(
            "获取最新会话列表失败, code:" +
              error.code +
              "content:" +
              error.content
          );
        },
      });
    },
    listenConversationUpdate() {
      // 监听会话列表变化
      this.goEasy.im.on(
        this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED,
        this.renderConversations
      );
    },
    renderConversations(content) {
      console.log(content);
      this.conversations = content.conversations; /// 会话列表
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
        return (IMAGE_MAX_WIDTH / width) * height;
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

    clickYqms(i) {
      let userProfile = this.userProfile;
      let yqms_tag = this.yqms_tag;
      let ms_infoData = i;
      let text = "";
      let payload = {
        name: userProfile.basic_info.real_name,
        way_status: yqms_tag, //3、是同意 2、是拒绝；
      };
      if (yqms_tag == 3) {
        text = "同意面试邀请";
        payload.text = text;
        (payload.position_name = ms_infoData.position_name),
          (payload.interview_time = ms_infoData.interview_time); // 面试时间
        payload.staff = ms_infoData.staff; // 企业联系人
        payload.phone = ms_infoData.phone; // 手机号
        payload.interview_address = ms_infoData.interview_address; //地址
        payload.remark = ms_infoData.remark; // 备注
        payload.latitude = ms_infoData.latitude;
        payload.longitude = ms_infoData.longitude;
      }
      if (yqms_tag == 2) {
        text = "拒绝面试邀请";
        payload.text = text;
      }

      this.goEasy.im.createCustomMessage({
        type: "interview", //字符串，可以任意自定义类型 interview 联系方式
        text,
        payload,
        to: this.to,
        onSuccess: (message) => {
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    // 同意面试邀请、拒绝面试邀请
    getUserIinterviewInvite(n, info) {
      let that = this;
      that.yqms_tag = n;
      let p = {
        id: info.interview_id, // 岗位id
        status: n, //3、是同意 2、是拒绝
      };
      that.$axios.post("/api/user/operate-interview-invite", p).then((res) => {
        if (res.code == 0) {
          that.clickYqms(info);
          // 获取历史记录
          this.loadHistoryMessage(true);

          this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onReceivedPrivateMessage); // 监听消息

          this.listenConversationUpdate(); //监听会话列表变化
          this.loadConversations(); //加载会话列表
          // 获取个人信息
          this.getUserProfile();
        }
      })
    },
    beforeDestroy() {
      this.goEasy.im.off(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onReceivedPrivateMessage);
      this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
    },
      // 删除引用消息
      clickCliseMessage(){
        this.quoteMessageShow = false;
        this.quoteMessage = '';
      },
      // 点击企业端头像
      clickFriendAvatar(){
        let friend = this.friend;
        if(friend.company_id){
          this.$router.push({
              path:'/companyDetails',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                id:friend.company_id
              }
            })
          // this.en_company_id= '';
          // this.$nextTick( ()=>{
          //   this.en_company_id = friend.company_id;
          //   this.en_dialogVisible = true;
          // })

        }
      },
      handleEnClose(){
        this.en_company_id = '';
        this.en_dialogVisible = false;
      },
      // 点击头像跳转页面
      clickUserImage(type){
        if(type == 0){ // 个人主页
          this.$router.push({path:'/careerIdentity'});
        } else {
          that.$message.error({
            message: res.msg,
          });
        }
      },
    //

    // 交换联系方式
    clickPhoneWechatBtn(type, n, tag, i) {
      let that = this;
      let userProfile = this.userProfile;
      let item = i;
      let p = {
        position_id: that.friend.position_id, // 岗位id
        company_id: that.friend.company_id, // 公司id
        uid: that.friend.uid,
      };
      let apiUrl = "";
      // type ==1 点击 交换按钮  type ==2  列表内 点击同意交换方式按钮
      if (type == 1) {
        apiUrl = "/api/company-deliver/get-contact-information";
      }
      if (type == 2) {
        apiUrl = "/api/company-deliver/operate-contact-information";
        p.status = 1;
      }
      // tag : 'phone' 手机的联系方式  'wechat' 微信的联系方式
      if (tag == "phone") {
        p.user_phone = userProfile.basic_info.real_phone;
        if (type == 2) {
          p.company_phone = item.payload.real_phone;
        }
      }
      if (tag == "wechat") {
        p.user_wx = userProfile.basic_info.wechat_number;
        if (type == 2) {
          p.company_wx = item.payload.wechat_number;
        }
        if (!p.user_wx || p.user_wx == "") {
          that.$message.warning("请先在我的简历内添加微信!");
          return;
        }
      }
      that.$axios.post(apiUrl, p).then((res) => {
        console.log(res);
        if (res.code == 0) {
          if (tag == "phone") {
            that.sendPhoneMsg(n);
          }
          if (tag == "wechat") {
            that.sendWechatMsg(n);
          }
        } else {
          that.$message.error({
            message: res.msg,
          });
        }
      });
    },
    // 发送出 交换联系方式消息
    sendPhoneMsg(n) {
      let userProfile = this.userProfile;
      let payload = {
        text: "交换联系方式",
        real_phone: userProfile.basic_info.real_phone,
        phone: userProfile.basic_info.phone,
        real_name: userProfile.basic_info.real_name,
        name: userProfile.basic_info.name,
        way_status: n, // 1. 向对方发起交换联系方式发出请求,2.boss 发送过来的手机号(boss同意) 3.同意对方索要联系方式 4. boss发送交换联系方式发出请求
      };
      this.goEasy.im.createCustomMessage({
        type: "phone", //字符串，可以任意自定义类型 phone 联系方式
        text: "交换联系方式",
        payload,
        to: this.to,
        onSuccess: (message) => {
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },

    // 发送交换微信聊天信息
    sendWechatMsg(n) {
      let userProfile = this.userProfile;
      let payload = {
        text: "交换微信",
        wechat_number: userProfile.basic_info.wechat_number,
        real_name: userProfile.basic_info.real_name,
        name: userProfile.basic_info.name,
        way_status: n, // 1. 向对方发起交换联系方式发出请求,2.boss 发送过来的手机号(boss同意) 3.同意对方索要联系方式 4. boss发送交换联系方式发出请求
      };
      this.goEasy.im.createCustomMessage({
        type: "wechat", //字符串，可以任意自定义类型 wechat 联系方式
        text: "交换微信",
        payload,
        to: this.to,
        onSuccess: (message) => {
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },

    // 发送出简历消息
    clickToolbarBtn() {
      let that = this;
      let userProfile = that.userProfile;
      let payload = {
        text: "发送简历",
        resume: userProfile.basic_info.curriculum_vitae,
      };
      this.goEasy.im.createCustomMessage({
        type: "resume", //字符串，可以任意自定义类型 resume 简历
        text: "发送简历",
        payload,
        to: this.to,
        onSuccess: (message) => {
          console.log(message);
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    // 点击 发简历按钮
    clickDeliver() {
      let that = this;
      if (that.userVipRank < 1) {
        this.$message.error("需要升级为VIP会员可投递简历!");
        setTimeout(() => {
          that.$router.push("/talentSide/topUpBuy");
        }, 1000);
        return;
      }
      let userProfile = that.userProfile;
      if (!userProfile.basic_info.curriculum_vitae) {
        that.$message.error({
          message: "请先填写简历信息并上传简历附件！",
        });
        return;
      }
      let p = {
        position_id: that.friend.position_id, // 岗位id
        company_id: that.friend.company_id, // 公司id
        company_uid: that.to.data.uid, //  发布人uid
      };
      console.log(p);
      that.$axios.post("/api/user/deliver", p).then((res) => {
        console.log(res);
        if (res.code == 0) {
          that.clickToolbarBtn();
        } else {
          that.$message.error({
            message: res.msg,
          });
        }
      });
    },
    // 腾讯云 语音自定义事件
    user_TUICallKitInfo(e) {
      console.log(e);
      let txy_type = e.type;
      let counter = e.counter;
      let text = "";
      let payload = {
        txy_type,
      };
      // type:1、 正在语音； 2、正在视频；3、通话结束；4、视频结束;5、发起呼叫；6、呼叫失败
      if (txy_type == 3 || txy_type == 4) {
        payload.text = e.text + counter;
        payload.counter = counter;
      } else {
        payload.text = e.text;
      }

      this.goEasy.im.createCustomMessage({
        type: "TUICallKit", //字符串，可以任意自定义类型 TUICallKit 腾讯云音视频
        text,
        payload,
        to: this.to,
        onSuccess: (message) => {
          console.log(message);
          this.sendMessage(message);
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    // 发送按钮事件
    sendTextMessage() {
      let that = this;
      if (!that.text.trim()) {
        that.$message.error({
          message: "输入不能为空!",
        });
        return;
      }
      if (that.friend.position_id) {
        let p = {
          position_id: that.friend.position_id, // 岗位id
          company_uid: that.to.data.uid, //  发布人uid
          company_id: that.friend.company_id, // 公司id
          content: that.text,
        };
        that.$axios.post("/api/user/find-company", p);
      }

      // 是否是引用的消息
      if (this.quoteMessageShow) {
        this.setQuoteMessage();
        return;
      }

      that.goEasy.im.createTextMessage({
        text: that.text,
        to: that.to,
        onSuccess: (message) => {
          that.sendMessage(message);
          that.text = "";
        },
        onFailed: (err) => {
          console.log("创建消息err:", err);
        },
      });
    },
    onInputFocus() {
      this.emoji.visible = false;
    },
    clickInput() {
      this.$refs.input.focus();
    },
    // 点击常用语 icon
    showCyyBox() {
      let that = this;
      if (that.cyy.visible) {
        that.cyy.visible = false;
        return;
      } else {
        that.$axios
          .post("/api/common-language/list", {
            no_looding: 1, // 隐藏-- 封装请求里的 looding
          })
          .then((res) => {
            if (res.code == 0) {
              that.phraseslist = res.data;
              that.cyy.visible = true;
            } else {
              that.$message.error({
                message: res.msg,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    // 点击常用语列表
    clickCyy(text) {
      this.text = text;
      this.cyy.visible = false;
    },
    // 点击表情
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
            console.log(progress);
          },
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (e) => {
            console.log("error :", e);
          },
        });
      });
    },

    sendVideoMessage(e) {
      const file = e.target.files[0];
      this.goEasy.im.createVideoMessage({
        file: file,
        to: this.to,
        onProgress: function (progress) {
          console.log(progress);
        },
        onSuccess: (message) => {
          this.sendMessage(message);
        },
        onFailed: (e) => {
          console.log("error :", e);
        },
      });
    },

    sendFileMessage(e) {
      const file = e.target.files[0];
      this.goEasy.im.createFileMessage({
        file: file,
        to: this.to,
        onProgress: function (progress) {
          console.log(progress);
        },
        onSuccess: (message) => {
          this.sendMessage(message);
        },
        onFailed: (e) => {
          console.log("error :", e);
        },
      });
    },
    sendMessage(message) {
      this.history.messages.push(message);
      this.scrollToBottom();
      this.goEasy.im.sendMessage({
        message: message,
        onSuccess: (message) => {
          console.log("发送成功", message);
        },
        onFailed: function (error) {
          if (error.code === 507) {
            alert("发送失败，没有配置OSS存储");
            console.log("发送失败，没有配置OSS存储");
          } else {
            console.log("发送失败:", error);
          }
        },
      });
    },
    showActionPopup(message, e) {
      this.leftX = e.layerX;
      this.topY = e.layerY;
      const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
      this.messageSelector.ids = [message.messageId];
      if (
        Date.now() - message.timestamp < MAX_RECALLABLE_TIME &&
        message.senderId === this.currentUser.id &&
        message.status === "success"
      ) {
        this.actionPopup.recallable = true;
      } else {
        this.actionPopup.recallable = false;
      }
      this.actionPopup.visible = true;
    },
    showCancel() {
      this.messageSelector.ids = [];
      this.messageSelector.visible = false;
      this.actionPopup.visible = false;
    },
    deleteSingleMessage() {
      this.actionPopup.visible = false;
      this.deleteMessage();
    },
    deleteMultipleMessages() {
      if (this.messageSelector.ids.length > 0) {
        this.messageSelector.visible = false;
        this.deleteMessage();
      }
    },
    // 取消选择按钮
    cancelMultipleMessages() {
      this.messageSelector.ids = [];
      setTimeout(() => {
        this.messageSelector.visible = false;
      }, 1000);
    },
    //删除
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
            console.log("error:", error);
          },
        });
      } else {
        this.messageSelector.ids = [];
      }
    },
    //撤回
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
          console.log("撤回成功");
        },
        onFailed: (error) => {
          console.log("撤回失败,error:", error);
        },
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
        this.messageSelector.ids.push(e.target.value);
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
          console.log(result);
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
          setTimeout(() => {
            console.log(this.detailData);
          }, 100);
        },
        onFailed: (error) => {
          //获取失败
          this.history.loading = false;
          console.log(
            "获取历史消息失败, code:" +
              error.code +
              ",错误信息:" +
              error.content
          );
        },
      });
    },
    markPrivateMessageAsRead() {
      this.goEasy.im.markMessageAsRead({
        id: this.to.id,
        type: this.to.type,
        onSuccess: function () {
          console.log("标记私聊已读成功");
        },
        onFailed: function (error) {
          console.log("标记私聊已读失败", error);
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
        if (
          message.timestamp - this.history.messages[index - 1].timestamp >
          5 * 60 * 1000
        ) {
          return this.formatDate(message.timestamp);
        }
      }
      return "";
    },

    clickvipRank_0() {
      this.$message.error("需要升级为VIP会员才可发送文件!");
      setTimeout(() => {
        this.$router.push("/talentSide/topUpBuy");
      }, 1000);
      return;
    },
    // 获取个人信息
    getUserProfile() {
      let that = this;
      that.$axios
        .post("/api/user/profile", {})
        .then((res) => {
          if (res.code == 0) {
            that.userProfile = res.data;
          } else {
            that.$message.error({
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 点击常用语设置
    clickSetBtn() {
      this.cyy.visible = false;
      this.$router.push({
        path: "/talentSideSettings",
        query: {
          setType: "set_expressions",
        },
      });
    },
    // 点击查看面试信息
    // goTomyDelivery(){
    //   this.$router.push('/myDelivery?subTag=3');
    // },
    // 点击发送出去的面试邀请信息
    clickInterview(i) {
      console.log(i);
      this.ms_infoData = i.payload;
      this.ms_dialogVisible = true;
      this.initBaiduMap();
    },
    // 初始化百度地图
    initBaiduMap() {
      let that = this;
      this.$nextTick(function () {
        BaiduMap.init().then((BMap) => {
          // 这个时候就可以访问到BMap了，
          /** 初始化地图Start */
          var map = new BMap.Map("baidu-msyq"); // 创建地图实例
          var point = new BMap.Point(
            that.ms_infoData.longitude,
            that.ms_infoData.latitude
          ); // 设置中心点坐标
          map.centerAndZoom(point, 13); // 地图初始化，同时设置地图展示级别
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
          /** 初始化地图End */
          // 创建标注
          const marker = new BMap.Marker(point);

          // 将标注添加到地图中
          map.addOverlay(marker);
          /** 点击地图创建坐标事件Start */
        });
      });
    },
    handleClose() {},
    ms_handleClose() {
      this.ms_dialogVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
.share-title,
.share-tips {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 160px; /* 设置一个宽度，可以根据需要调整 */
}
.share-tips {
  font-size: 14px;
}
.share-card {
  padding: 10px;
  display: flex;
  padding-bottom: 4px;
  margin-bottom: 2px;
  border-radius: 4px;
  background: #f5f5f5;
  flex-wrap: wrap;
  max-width: 240px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 4px;
  }
  .tips {
    width: 100%;
    font-size: 12px;
    color: #999;
    margin-top: 6px;
  }
}

.chat-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-title {
  height: auto;
  padding: 6px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border-bottom: 1px solid #f2f2f2;
}
.position-name {
  width: auto;
  display: flex;
  align-items: center;
}
.span-2 {
  color: #37f;
}
.chat-title-l {
  display: flex;
  align-items: center;
}
.chat-avatar {
  width: 35px;
  height: 35px;
}
.chat-avatar.hover {
  cursor: pointer;
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
  margin-top: 8px;
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

.message-item-checkbox input[type="checkbox"]::before,
.message-item-checkbox input[type="checkbox"]:checked::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  background: #ffffff;
  width: 20px;
  height: 20px;
  border: 1px solid #d02129;
  border-radius: 50%;
}

.message-item-checkbox input[type="checkbox"]:checked::before {
  content: "\2713";
  background-color: #d02129;
  width: 20px;
  color: #ffffff;
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
.span-id {
  padding-top: 4px;
  font-size: 13px;
  font-weight: bold;
}

.sender-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* .message-content {
    max-width: calc(100% - 100px);
  } */

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
}

.message-unread {
  color: #d02129;
  font-size: 12px;
  text-align: end;
  height: 16px;
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
  .fz-box {
    width: 100%;
    margin-top: 4px;
    display: flex;
    align-items: center;
    & > img {
      width: 17px;
      height: 17px;
      margin-right: 4px;
      cursor: pointer;
    }
  }
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

.content-file {
  width: 240px;
  height: 65px;
  font-size: 15px;
  background: #ffffff;
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
  .fz-box {
    justify-content: flex-end;
    & > img {
      margin-right: 0;
      margin-left: 4px;
    }
  }
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
  color: #d02129;
  cursor: pointer;
}

.chat-footer {
  border-top: 1px solid #dcdfe6;
  width: 100%;
  background: #ffffff;
}

.action-delete {
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.action-delete > div {
  cursor: pointer;
  font-size: 14px;
  padding: 20px;
  box-sizing: border-box;
}
.action-delete > div.delete-text {
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
.action-bar-left {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.action-bar-right {
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
/*================ 常用语 样式  ↓  =================*/
.sentence-panel {
  position: absolute;
  z-index: 15;
  bottom: 60px;
  left: 0;
  width: 400px;
  background: #fff;
  box-shadow: 0 3px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.sentence-panel .header {
  line-height: 34px;
  height: 34px;
  background: linear-gradient(90deg, #dee7fb, #fcfbfa);
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
  box-shadow: 16px 3px 11px 0 rgba(0, 0, 0, 0.1);
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
  position: relative;
}
.reply-message {
  width: 600px;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  word-wrap: break-word;
  position: absolute;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  margin-left: 20px;
  color: #555;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    cursor: pointer;
  }
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
  background: #ffffff;
  word-break: break-all;
  font-size: 14px;
}

.send-box {
  height: auto;
  padding: 4px 20px;
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
  color: #ffffff;
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
  background: #f1f1f1;
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
  background: #ffffff;
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
  padding: 0 8px;
  line-height: 23px;
  vertical-align: top;
  margin-right: 8px;
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
/* ============ 交换联系方式  ↓ ==================*/
.message-phone-box {
  width: auto;
  text-align: center;
  font-size: 13px;
  color: #d02129;
  padding: 10px;
}
.message-phone-universal-card {
  max-width: 260px;
  margin: 10px auto;
  background: #fff;
  border: 1px solid rgba(202, 208, 217, 0.7);
  border-radius: 6px;
}
.message-phone-universal-card-header {
  padding: 6px 16px;
  color: #356ce9;
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  background: linear-gradient(270deg, #f2f6ff, rgba(227, 236, 255, 0.85));
  border-radius: 6px 6px 0 0;
}
.message-phone-universal-card-content {
  padding: 8px 16px;
  color: #222;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.message-phone-universal-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.message-phone-universal-card-footer .span-ckms {
  font-size: 13px;
  color: #356ce9;
  cursor: pointer;
}
.message-phone-universal-card-btn {
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
  margin: 0 10px;
}

/* ============ 交换联系方式  ↑ ==================*/
.container-zx /deep/ .el-dialog {
  min-width: 320px;
  max-height: 500px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0 !important;
  overflow: hidden;
  .el-dialog__header {
    text-align: left;
    padding: 10px 20px;
    .el-dialog__title {
      font-size: 16px;
      color: $g_textColor;
    }
    .el-dialog__headerbtn {
      top: 10px;
    }
  }
  .el-dialog__body {
    padding: 0px 10px;
    height: calc(100vh - 150px);
    overflow: overlay;
    .pc-preview-wrapper {
      border-radius: 4px;
      padding: 10px;
      color: $g_textColor;
      line-height: 26px;

      .box-items {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 10px;
        &:nth-of-type(1) {
          margin-top: 0;
        }
        .items {
          flex: 1;
          display: flex;
          align-items: center;
          .items-label {
            width: 80px;
            font-size: 14px;
            font-weight: bold;
            text-align: right;
          }
          .items-text {
            font-size: 14px;
            color: #414a60;
            padding-left: 4px;
          }
        }
        .items-l {
          justify-content: flex-start;
        }
        .items-r {
          justify-content: flex-end;
          .label-text {
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            img {
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
.message-quote {
  border: 1px solid #000;
}
.color-ff0000 {
  color: #ff0000;
}
</style>
