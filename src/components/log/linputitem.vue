<template>
  <div class="linputitem">
    <i :class="`iconfont ${iconclass}`"></i>
    <input :type="type"
           :placeholder="placeholder"
           @blur='blur'
           v-model="values">
  </div>
</template>
<script>
export default {
  props: {
    iconclass: String,
    placeholder: String,
    value: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      values: ''
    }
  },
  methods: {
    blur () {
      this.$emit('input', this.values)
      this.$emit('check')
    }
  }
}
</script>

<style lang="scss" scoped>
.linputitem {
    width: 592px;
    margin: 0 auto 32px;
    height: 80px;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.22); /*no*/
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    input {
        width: 100%;
        height: 100%;
        line-height: 80px;
        font-size: 30px;
        padding: 0 30px 0 92px;
    }
    i {
        font-size: 40px;
        color: #7f8081;
        position: absolute;
        left: 30px;
        top: 21px;
    }
}
</style>

