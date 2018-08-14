<template>
  <div class="reg">
    <z-lheader title="注册"></z-lheader>
    <form action="/"
          onsubmit="return false">
      <z-linputitem placeholder="请输入账号（2-10位）"
                    iconclass="icon-wode"
                    v-model="account"
                    @check="verifyaccount"
                    :class="checkaccount=='no'?'no':''" />
      <z-linputitem placeholder="请输入密码（6-20位）"
                    iconclass="icon-mima"
                    v-model="password"
                    type="password"
                    @check="verifypass"
                    :class="checkpass=='no'?'no':''" />
      <z-linputitem placeholder="请再次输入密码"
                    iconclass="icon-mima"
                    v-model="repassword"
                    type="password"
                    @check="verifyrepass"
                    :class="checkrepass=='no'?'no':''" />
      <van-button size="large"
                  type="danger"
                  class="reg_btn"
                  @click="reg">立即注册</van-button>
    </form>
    <p class="reg_notes">
      <router-link to="/log">
        已有账号？
        <span>立即登录</span>
      </router-link>
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
      repassword: '',
      checkaccount: '',
      checkpass: '',
      checkrepass: ''
    }
  },
  methods: {
    verifyaccount () {
      if (!this.account) {
        this.$toast('账号不能为空')
        this.checkaccount = 'no'
      } else if (this.account.length < 2 || this.account.length > 10) {
        this.$toast('账号长度有误')
        this.checkaccount = 'no'
      } else {
        this.$api.accountused(this.account).then((data) => {
          if (data.data.has) {
            this.$toast('此账户已被注册，换一个吧~')
            this.checkaccount = 'no'
          } else {
            this.checkaccount = 'yes'
          }
        })
      }
    },
    verifypass () {
      if (!this.password) {
        this.$toast('密码不能为空')
        this.checkpass = 'no'
      } else if (this.password.length < 6 || this.password.length > 20) {
        this.$toast('密码长度有误')
        this.checkpass = 'no'
      } else {
        this.checkpass = 'yes'
        if (this.repassword && (this.repassword != this.password)) {
          this.$toast('两次输入密码不一致')
          this.checkrepass = 'no'
        }
      }
    },
    verifyrepass () {
      if (!this.repassword) {
        this.$toast('请输入确认密码')
        this.checkrepass = 'no'
      } else if (this.repassword != this.password) {
        this.$toast('两次输入密码不一致')
        this.checkrepass = 'no'
      } else {
        this.checkrepass = 'yes'
      }
    },
    reg () {
      if (this.checkaccount == 'yes' && this.checkpass == 'yes' && this.checkrepass == 'yes') {
        this.$api.reg(this.account, this.password).then((data) => {
          this.$cookies.set('token', data.data.token)
          this.setToken(data.data.token)
          this.setUserinfo(data.data.userInfo)
          this.$router.push('/')
        })
      } else {
        this.$toast('表单未正确输入')
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
.no {
    border: 1px solid red; /*no*/
}
.reg {
    width: 100%;
    height: 100vh;
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
            color: #f94c3e;
        }
    }
}
</style>