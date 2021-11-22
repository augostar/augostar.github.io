<template>
  <div ref="chartDom" class="cake" />
</template>


<script >
import { defineComponent, onMounted, onUpdated, ref, toRefs } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import {
  PieChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
);

export default defineComponent({

  props:{
    title:{
      type:String,
      default:''
    },
    goodsType:{
      type: Object,
      default() {
        return {  };
      }
    }
  },
  setup(_props) {
    let chartDom = ref(null);
    const {goodsType} = toRefs(_props);
    onUpdated(()=>{
      echartsExample();
    });
    onMounted(()=>{
      echartsExample();
    });
    const echartsExample = ()=>{
      let myChart = echarts.init(chartDom.value);
      let option;

      option = {
        title: {
          text: _props.title,
          // subtext: '根据商品个数统计',
          left: 'center'
        },
        type: 'pie',
        tooltip: {
          trigger: 'item',
          formatter: ' <br/>{b} : {c} 个(占比：{d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: goodsType.value.title_array
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            title:'类型',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: goodsType.value.information,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    };

    return {
      chartDom
    };
  }
});
</script>


<style lang="less" scoped>
.cake{
  min-height: 300px;
}
</style>

