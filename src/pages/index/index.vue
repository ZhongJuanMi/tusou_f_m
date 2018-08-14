<template>
  <div class="weight">
    <div class="weight_t">
      <span>欢迎你，{{userInfo.name}}</span>
      <span @click="logout">退出登录</span>
    </div>
    <div class="content">
      <z-chart :weights="weights"
               v-if="weights.length"></z-chart>
      <div class="weight_n">
        <p v-if="!weights.length">开始记录体重吧~减肥从今天开始！</p>
        <p v-if="!userInfo.idealWeight">设置个人信息后，可比对标准体重和目标体重哦~</p>
      </div>
      <div class="weight_b">
        <van-button type=""
                    @click="infoshow=true">个人信息</van-button>
        <van-button type="warning"
                    @click="weightshow=true">记录体重</van-button>
      </div>
    </div>
    <z-info-dialog v-model="infoshow"></z-info-dialog>
    <z-weight-dialog v-model="weightshow"
                     @refresh="getWeight"></z-weight-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ZChart from '@/components/weight/chart'
import ZInfoDialog from '@/components/weight/infoDialog'
import ZWeightDialog from '@/components/weight/weightDialog'
export default {
  data () {
    return {
      weights: [],
      infoshow: false,
      weightshow: false
    }
  },
  components: {
    ZChart,
    ZInfoDialog,
    ZWeightDialog
  },
  beforeMount () {
    if (!this.userInfo.name) {
      let token = this.$cookies.get('token')
      if (token) {
        let that = this
        this.$api.getUser().then((data) => {
          if (data.code === 2000) {
            that.setToken(data.data.token)
            that.setUserinfo(data.data.userInfo)
            that.getWeight()
          } else {
            this.$cookies.remove('token')
            this.$toast('请先登录哦~')
            this.$router.push('/log')
          }
        })
      } else {
        this.$toast('请先登录哦~')
        this.$router.push('/log')
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', 'token'
    ])
  },
  methods: ({
    logout () {
      this.setToken('')
      this.setUserinfo('')
      this.$cookies.remove('token')
      this.$router.push('/log')
    },
    ...mapMutations({
      setUserinfo: 'SET_USERINFO',
      setToken: 'SET_TOKEN'
    }),
    ...mapActions([
      'changeinfo'
    ]),
    getWeight () {
      this.$api.getWeight().then(({ data }) => {
        this.weights = data.weights
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.content {
    margin-top: 120px;
}
.weight {
    width: 100%;
    height: 100vh;
    padding: 0 30px;
    background: linear-gradient(
        45deg,
        rgba(91, 234, 213, 0.9),
        rgba(98, 103, 252, 0.9)
    );
    &_t {
        font-size: 30px;
        line-height: 100px;
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
    &_n {
        p {
            text-align: center;
            font-size: 28px;
            line-height: 50px;
            color: $black;
            &:first-child {
                color: $gray-lighter;
            }
        }
    }
    &_b {
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
        button {
            width: 280px;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
            border-radius: 50px;
        }
    }
}
</style>

