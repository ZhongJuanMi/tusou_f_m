
  <template>
  <van-dialog :title="$store.state.userInfo.name+'来记录体重啦'"
              v-model="show"
              :show-confirm-button="false"
              className="weight_info"
              ref='infoForm'>
    <van-cell-group>

      <van-cell>
        <van-field v-model="weight"
                   type="text"
                   label="记录体重"
                   placeholder="请输入您当前体重(kg)"
                   required />
      </van-cell>
      <van-datetime-picker v-model="currentDate"
                           type="datetime"
                           :max-date="maxDate"
                           :visible-item-count="2"
                           title="选择记录时间"
                           :item-height="36" />

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
// 重写Date原型方法
Date.prototype.toString = function () {
  return (
    this.getFullYear() +
    '-' +
    (this.getMonth() > 8 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1)) +
    '-' +
    (this.getDate() > 9 ? this.getDate() : '0' + this.getDate()) +
    ' ' +
    (this.getHours() > 9 ? this.getHours() : '0' + this.getHours()) +
    ':' +
    (this.getMinutes() > 9 ? this.getMinutes() : '0' + this.getMinutes())
  )
}
import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
export default {
  props: {
    value: Boolean
  },
  created () {
    this.initForm()
  },
  data () {
    return {
      show: false,
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    initForm () {
      this.weight = '',
        this.currentDate = new Date()
    },
    cancle () {
      this.show = false
      this.initForm()
    },
    submitForm () {
      let that = this
      if (this.weight) {
        if (this.weight > 100 || this.weight < 40) {
          this.$toast('请输入真实的体重值')
        } else {
          this.$api.setweight({
            weight: this.weight,
            datetime: this.currentDate.toString()
          }).then(() => {
            that.$emit('refresh')
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
  <style lang="scss"
         scoped>
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
