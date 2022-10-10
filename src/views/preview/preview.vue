<template>
  <div class="preview-wrap">
    <div class="preview">
      <div class="personal-card">
        <div class="company-name">{{ personal?.companyName }}</div>
        <div class="card-info">
          <div class="username">{{ personal?.username }}</div>
          <div class="department">{{ personal?.roleName }}</div>
          <div class="contact">
            <div class="telephone">电话：{{ personal?.phoneNumber }}</div>
            <div class="email">邮箱：{{ personal?.email }}</div>
            <div class="wechat">微信：{{ personal?.telWeixin }}</div>
          </div>
          <div class="qrcode">
            <img
              v-show="personal?.weixinCode"
              :src="'http://' + personal?.weixinCode"
            />
          </div>
        </div>
      </div>
      <div class="method">
        <div>保存至相册</div>
        <div>添加联系人</div>
        <div>复制微信号</div>
        <div>转发名片</div>
      </div>
      <div class="information">
        <div class="header">个人介绍</div>
        <div class="body">
          <div class="photo">
            <img v-if="photo" :src="'http://' + photo" alt="" />
            <img v-else src="@/assets/images/nophoto.png" alt="" />
          </div>
          <div class="info">
            {{ desc ? desc : "" }}
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="header">
          <div class="title">咨询留言</div>
          <div class="link">我要咨询/留言</div>
        </div>
        <div class="body">
          <template v-if="!comments.length">
            <div class="nothing">
              <img src="@/assets/images/nothing.png" alt="" />
              <span>暂无留言</span>
            </div>
          </template>
          <template v-for="item in comments" :key="item.id">
            <div class="comment">
              <div class="avatar">
                <img src="@/assets/images/avatar.png" alt="" />
                {{ item.name }}
              </div>
              <div class="content">
                {{ item.notesContent }}
              </div>
              <div v-if="item.childrenNote?.notesContent" class="reply">
                <span>回复：</span>
                {{ item.childrenNote.notesContent }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import { useRoute } from "vue-router"
import { computed } from "vue"

export default {
  setup() {
    const route = useRoute()
    const id = route.params.id
    // 请求名片信息、照片、简介、评论
    store.dispatch("preview/getPersonalAction", id)
    store.dispatch("preview/getCommentsAction", id)
    store.dispatch("preview/getPhotoAction", id)
    store.dispatch("preview/getDescAction", id)

    const personal = computed(() => store.state.preview.personal)
    const comments = computed(() => store.state.preview.comments)
    const photo = computed(() => store.state.preview.photo)
    const desc = computed(() => store.state.preview.desc)

    return {
      personal,
      comments,
      photo,
      desc
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #f4f5f7;
  box-sizing: border-box;

  .preview {
    width: 400px;
    min-height: calc(100vh - 100px);
    box-shadow: 0 0 15px 0 hsl(203deg 6% 45% / 9%);
    background-color: #fff;
    background-image: url(@/assets/images/linear-bg.png);
    /* 背景图垂直、水平均居中 */
    background-repeat: no-repeat;
    background-size: contain;
    padding: 15px;
    box-sizing: border-box;

    .company-name {
      color: #fff;
      margin-top: 25px;
      font-size: 16px;
    }
    .personal-card {
      box-shadow: 0 0 15px 0 hsl(203deg 6% 45% / 9%);
      .card-info {
        position: relative;
        width: 100%;
        height: 200px;
        background-image: url(@/assets/images/card.png);
        background-repeat: no-repeat;
        background-size: contain;
        margin-top: 30px;
        padding-left: 20px;
        padding-top: 30px;
        box-sizing: border-box;

        .username {
          font-size: 18px;
          font-weight: 700;
          height: 18px;
          margin-bottom: 10px;
          color: #333;
        }

        .department {
          color: #555;
          height: 14px;
        }

        .contact {
          margin-top: 30px;

          div {
            margin-bottom: 8px;
          }
        }

        .qrcode {
          position: absolute;
          right: 20px;
          top: 25px;
          width: 65px;
          height: 65px;

          img {
            width: 100%;
          }
        }
      }
    }

    .method {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      div {
        background-repeat: no-repeat;
        background-size: contain;
        width: 88px;
        height: 88px;
        text-align: center;
        line-height: 138px;
        color: #333;
      }

      > div:nth-child(1) {
        background-image: url(@/assets/images/photo-bg.png);
      }

      > div:nth-child(2) {
        background-image: url(@/assets/images/contact-bg.png);
      }

      > div:nth-child(3) {
        background-image: url(@/assets/images/copy-bg.png);
      }

      > div:nth-child(4) {
        background-image: url(@/assets/images/share-bg.png);
      }
    }

    .information {
      margin-top: 20px;

      .header {
        font-size: 16px;
        margin-bottom: 15px;
        color: #333;
      }

      .body {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;

        .photo {
          display: block;
          width: 85px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 85px;
            min-height: 85px;
            object-fit: cover;
          }
        }
        .info {
          flex: 1;
          word-wrap: break-word;
          word-break: normal;
          padding-left: 10px;
          line-height: 16px;
        }
      }
    }

    .comments {
      margin-top: 20px;
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        .title {
          font-size: 16px;
          color: #333;
        }

        .link {
          color: #268efd;
          cursor: pointer;
        }
      }

      .body {
        .nothing {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 15px 0;

          img {
            width: 200px;
          }

          span {
            font-size: 12px;
            color: #cbcbcb;
            text-align: center;
          }
        }
        .comment {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          .avatar {
            margin-bottom: 10px;

            img {
              width: 33px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
          .content {
            line-height: 18px;
            margin-bottom: 10px;
          }
          .reply {
            background-color: #f6f8ff;
            padding: 10px 10px;
            line-height: 18px;

            span {
              color: #268efd;
            }
          }
        }

        .comment:last-child {
          border: 0;
          padding-bottom: 0;
        }
      }
    }
  }
}
</style>
