<template>
  <div id="chartBox">

  </div>

</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    weights: Array
  },
  mounted () {
    if (this.weights.length) {
      this.draw()
    }
  },
  watch: {
    weights: {
      handler (curVal, oldVal) {
        if (curVal.length) {
          this.draw()
        }
      },
      deep: true
    },
    userInfo: {
      handler () {
        this.draw()
      },
      deep: true
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    weightall () {
      return this.weights.map(item => {
        return item.AM * 1 > item.PM * 1 ? item.AM * 1 : item.PM * 1
      }).sort((a, b) => a - b)
    },
    min () {
      return this.weightall[0] * 1
    },
    max () {
      return this.weightall[this.weightall.length - 1] * 1
    }
  },
  methods: {
    draw () {
      // 目标体重
      // 标准体重
      let userInfo = this.$store.state.userInfo
      let idealWeight = userInfo.idealWeight ? userInfo.idealWeight : 0
      let height = userInfo.height ? userInfo.height : 0
      let normalWeight = parseInt(22 * height * height * 0.0001)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('chartBox'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: 0,
          top: 0,
          orient: 'vertical',
          tooltip: {
            show: true
          }
        },
        xAxis: {
          data: this.weights.map(item => item.date)
        },
        yAxis: {
          splitLine: {
            show: false
          },
          min: this.min < idealWeight * 1 ? this.min : idealWeight * 1,
          max: this.max > normalWeight * 1 ? this.max : normalWeight * 1
        },
        visualMap: {
          top: 0,
          left: 0,
          orient: 'horizontal',
          pieces: idealWeight ? [{
            gt: 0,
            lte: idealWeight,
            color: 'aqua'
          }, {
            gt: idealWeight,
            lte: normalWeight,
            color: '#ffde33'
          }, {
            gt: normalWeight,
            color: '#f56c6c'
          }] : []
        },
        series: [
          {
            name: '早晨',
            type: 'line',
            smooth: true,
            connectNulls: true,
            data: this.weights.map(function (item) {
              return item.AM
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: idealWeight,
                  label: {
                    position: 'middle',
                    formatter: '目标体重'
                  },
                  lineStyle: {
                    color: 'aqua'
                  }
                },
                {
                  yAxis: normalWeight,
                  label: {
                    position: 'middle',
                    formatter: '标准体重'
                  },
                  lineStyle: {
                    color: '#ffde33'
                  }
                }
              ]
            }
          },
          {
            name: '晚上',
            type: 'line',
            smooth: true,
            connectNulls: true,
            data: this.weights.map(function (item) {
              return item.PM
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: idealWeight,
                  label: {
                    position: 'middle',
                    formatter: '目标体重'
                  },
                  lineStyle: {
                    color: 'aqua'
                  }
                },
                {
                  yAxis: normalWeight,
                  label: {
                    position: 'middle',
                    formatter: '标准体重'
                  },
                  lineStyle: {
                    color: '#ffde33'
                  }
                }
              ]
            }
          }
        ],

      })
    }
  }
}
</script>

<style lang="scss" scoped>
#chartBox {
    width: 100%;
    height: 750px;
}
</style>
