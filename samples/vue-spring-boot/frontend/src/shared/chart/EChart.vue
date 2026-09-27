<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

interface ChartClickEvent {
  dataIndex: number
  name: string
}

const props = withDefaults(defineProps<{
  option: EChartsOption
  height?: string
}>(), {
  height: '320px'
})

const emit = defineEmits<{
  chartClick: [event: ChartClickEvent]
}>()

const host = ref<HTMLDivElement | null>(null)
let chart: ECharts | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!host.value) return

  chart = echarts.init(host.value)
  chart.setOption(props.option)

  chart.on('click', (params) => {
    emit('chartClick', {
      dataIndex: typeof params.dataIndex === 'number' ? params.dataIndex : -1,
      name: String(params.name ?? '')
    })
  })

  resizeObserver = new ResizeObserver(() => chart?.resize())
  resizeObserver.observe(host.value)
})

watch(
  () => props.option,
  (option) => {
    // Feature Component 只提供 declarative option；
    // ECharts instance 的 lifecycle 集中由這個 shared component 管理。
    chart?.setOption(option, { notMerge: true })
  },
  { deep: true }
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<template>
  <div
    ref="host"
    class="w-100"
    :style="{ height }"
    role="img"
    aria-label="資料圖表"
  ></div>
</template>
