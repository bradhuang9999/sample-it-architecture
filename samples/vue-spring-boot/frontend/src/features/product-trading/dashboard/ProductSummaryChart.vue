<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'

import EChart from '../../../shared/chart/EChart.vue'
import type { ProductTradingAggregate } from '../model/product-trading.types'

const props = defineProps<{
  items: ProductTradingAggregate[]
}>()

const emit = defineEmits<{
  select: [item: ProductTradingAggregate]
}>()

const option = computed<EChartsOption>(() => ({
  animationDuration: 250,
  grid: {
    left: 40,
    right: 24,
    top: 32,
    bottom: 80,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      interval: 0,
      rotate: 24
    },
    data: props.items.map(item => item.prodCode)
  },
  yAxis: {
    type: 'value',
    name: 'Trading Amount'
  },
  series: [
    {
      name: 'Trading Amount',
      type: 'bar',
      data: props.items.map(item => item.tradingAmount),
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      }
    }
  ]
}))

function handleChartClick(event: { dataIndex: number; name: string }): void {
  const item = props.items[event.dataIndex]
  if (item) {
    emit('select', item)
  }
}
</script>

<template>
  <EChart
    :option="option"
    height="360px"
    data-testid="product-summary-chart"
    @chart-click="handleChartClick"
  />
</template>
