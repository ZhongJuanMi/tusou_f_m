<template>
  <div class="log">
    <z-lheader title="登录"></z-lheader>
    <form action="/"
          onsubmit="return false">
      <z-linputitem placeholder="账号"
                    iconclass="icon-wode"
                    v-model="account" />
      <z-linputitem placeholder="请输入密码"
                    iconclass="icon-mima"
                    v-model="password"
                    type="password" />
      <van-button size="large"
                  type="sure"
                  class="log_btn"
                  @click="log">登录</van-button>
    </form>
    <p class="log_notes">
      <router-link to="/reg">
        还没有账号？
        <span>立即注册</span>
      </router-link>
      <a @click="forget">
        忘记密码
      </a>
    </p>
  </div>
</template>
<script>
import ZLheader from '@/components/log/lheader'
import ZLinputitem from '@/components/log/linputitem'
import { mapMutations } from 'vuex'
export default {
  components: {
    ZLheader,
    ZLinputitem
  },
  data () {
    return {
      account: '',
      password: '',
    }
  },
  methods: {
    forget () {
      this.$toast('忘记密码就重新注册咯，哈哈哈！');
    },
    log () {
      if (!this.account) {
        this.$toast('请输入登录账号');
      } else if (!this.password) {
        this.$toast('请输入登录密码');
      } else {
        this.$api.log(this.account, this.password).then((res) => {
          if (res.code !== 2000) {
            console.log(data)
            this.$toast('账号或密码错误');
          } else {
            this.$cookies.set('token', res.data.token)
            this.setToken(res.data.token)
            this.setUserinfo(res.data.userInfo)
            this.$router.push('/')
          }
        })
      }
    },
    ...mapMutations({
      setUserinfo: 'SET_USERINFO',
      setToken: 'SET_TOKEN'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common/var.scss';
.log {
    width: 100%;
    height: 100vh;
    background-size: 750px 440px;
    form {
        padding-top: 100px;
    }
    &_btn {
        width: 592px;
        height: 90px;
        display: block;
        margin: 32px auto 0;
        border-radius: 10px;
        font-size: 40px;
        color: #fff;
    }
    &_notes {
        width: 592px;
        margin: 40px auto 0;
        display: flex;
        justify-content: space-between;
        color: #6e6e6e;
        font-size: 24px;
        span {
            color: $primary;
        }
    }
}
</style>

