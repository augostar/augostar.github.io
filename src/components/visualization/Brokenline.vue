<template>
  <div ref="chartDom" class="line" />
</template>


<script >
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import {
  LineChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [
    TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer
  ]
);


export default defineComponent({
  setup() {
    let chartDom = ref(null);

    onMounted(()=>{
      let myChart = echarts.init(chartDom.value);
      let option;

      option = {
        title: {
          text: '商品价格'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['大型器材', '中型器材', '小型器材']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '大型器材',
            type: 'line',
            stack: '总量',
            data: [
              120, 132, 101, 134, 90, 230
            ]
          },
          {
            name: '中型器材',
            type: 'line',
            stack: '总量',
            data: [
              220, 182, 191, 234, 290, 330, 310
            ]
          },
          {
            name: '小型器材',
            type: 'line',
            stack: '总量',
            data: [
              150, 232, 201, 154, 190, 330, 410
            ]
          }
      
        ]
      };


      option && myChart.setOption(option);
    });

    return {
      chartDom
    };
  }
});
</script>


<style lang="less" scoped>
.line{
  min-width: 400px;
  min-height: 300px;
}
</style>

