<template>
  <van-dialog :title="$store.state.userInfo.name+'的个人信息'"
              v-model="show"
              :show-confirm-button="false"
              className="weight_info"
              ref='infoForm'>
    <van-cell-group>
      <van-cell>
        <van-radio-group v-model="gender"
                         class="radio_p">
          <van-radio :name="item.name"
                     v-for="(item,index) in columns"
                     :key="index">{{item.text}}</van-radio>
        </van-radio-group>
      </van-cell>
      <van-cell>
        <van-field v-model="height"
                   type="text"
                   label="身高"
                   placeholder="请输入您的身高信息(cm)"
                   required />
      </van-cell>
      <van-cell>
        <van-field v-model="idealWeight"
                   type="text"
                   label="目标体重"
                   placeholder="请输入您的目标体重(kg)"
                   required />
      </van-cell>

    </van-cell-group>
    <div class="weight_btn">
      <van-button @click="cancle()"
                  type="">取 消</van-button>
      <van-button type="warning"
                  @click="submitForm()">确 定</van-button>
    </div>
  </van-dialog>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    value: Boolean
  },
  created () {
    this.initForm()
  },
  data () {
    return {
      height: this.$store.state.userInfo.height,
      idealWeight: this.$store.state.userInfo.idealWeight,
      gender: this.$store.state.userInfo.gender,
      show: false,
      radio: '1',
      columns: [{
        name: 'male',
        text: '我是蓝孩纸'
      }, {
        name: 'female',
        text: '我是铝孩纸'
      }]
    }
  },
  methods: {
    initForm () {
      this.height = this.userInfo.height
      this.idealWeight = this.userInfo.idealWeight
      this.gender = this.userInfo.gender
    },
    cancle () {
      this.show = false
      this.initForm()
    },
    onChange () { },
    submitForm () {
      if (this.height && this.gender && this.idealWeight) {
        if (this.height > 200 || this.height < 100) {
          this.$toast('请输入真实的身高值')
        }
        else if (this.idealWeight > 100 || this.idealWeight < 40) {
          this.$toast('请输入真实的体重值')
        }
        else {
          this.changeinfo({
            name: this.userInfo.name,
            gender: this.gender,
            height: this.height,
            idealWeight: this.idealWeight
          })
          this.show = false
        }
      } else {
        this.$toast('请完成必填项后再提交哦~')
      }
    },
    ...mapActions(['changeinfo'])
  },
  watch: {
    value (val, oldval) {
      this.show = val
    },
    show (val, oldval) {
      if (val == true) {
        this.initForm()
      }
      this.$emit('input', val)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="scss" scoped>
.weight_info {
    font-size: 30px;
    height: 500px;
    padding: 0 40px;
}
.weight_btn {
    display: flex;
    margin-top: 30px;
    justify-content: space-around;
    button {
        font-size: 32px;
        width: 200px;
        height: 60px;
        border-radius: 30px;
    }
}
.radio_p {
    display: flex;
    align-items: center;
    > * {
        margin-right: 50px;
    }
}
</style>

