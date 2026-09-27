import * as echarts from 'echarts'
import type {
  ECharts,
  EChartsOption
} from 'echarts'
import {
  useEffect,
  useRef
} from 'react'

export interface ChartClickEvent {
  dataIndex: number
  name: string
}

interface EChartProps {
  option: EChartsOption
  height?: string
  testId?: string
  onChartClick?: (event: ChartClickEvent) => void
}

export function EChart({
  option,
  height = '320px',
  testId,
  onChartClick
}: EChartProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<ECharts | null>(null)
  const clickHandlerRef = useRef(onChartClick)

  useEffect(() => {
    clickHandlerRef.current = onChartClick
  }, [onChartClick])

  useEffect(() => {
    if (!hostRef.current) {
      return
    }

    const chart = echarts.init(hostRef.current)
    chartRef.current = chart

    chart.on('click', (params) => {
      clickHandlerRef.current?.({
        dataIndex: typeof params.dataIndex === 'number' ? params.dataIndex : -1,
        name: String(params.name ?? '')
      })
    })

    const resizeObserver = new ResizeObserver(() => chart.resize())
    resizeObserver.observe(hostRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    // Feature Component 只提供 declarative option；
    // ECharts instance lifecycle 集中由這個 shared component 管理。
    chartRef.current?.setOption(option, { notMerge: true })
  }, [option])

  return (
    <div
      ref={hostRef}
      className="w-100"
      style={{ height }}
      role="img"
      aria-label="資料圖表"
      data-testid={testId}
    />
  )
}
