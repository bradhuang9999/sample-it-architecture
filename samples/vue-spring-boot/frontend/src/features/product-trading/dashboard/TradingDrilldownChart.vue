<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'

import EChart from '../../../shared/chart/EChart.vue'
import type { MonthlyTrading } from '../model/product-trading.types'

const props = defineProps<{
  items: MonthlyTrading[]
}>()

const option = computed<EChartsOption>(() => ({
  animationDuration: 250,
  grid: {
    left: 40,
    right: 24,
    top: 32,
    bottom: 36,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: props.items.map(item => item.month)
  },
  yAxis: {
    type: 'value',
    name: 'Trading Amount'
  },
  series: [
    {
      name: 'Monthly Amount',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: props.items.map(item => item.tradingAmount)
    }
  ]
}))
</script>

<template>
  <EChart :option="option" height="300px" data-testid="trading-drilldown-chart" />
</template>
