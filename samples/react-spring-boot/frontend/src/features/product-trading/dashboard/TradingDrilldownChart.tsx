import type { EChartsOption } from 'echarts'
import { useMemo } from 'react'

import { EChart } from '../../../shared/chart/EChart'
import type { MonthlyTrading } from '../model/product-trading.types'

interface TradingDrilldownChartProps {
  items: MonthlyTrading[]
}

export function TradingDrilldownChart({
  items
}: TradingDrilldownChartProps) {
  const option = useMemo<EChartsOption>(() => ({
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
      data: items.map(item => item.month)
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
        data: items.map(item => item.tradingAmount)
      }
    ]
  }), [items])

  return (
    <EChart
      option={option}
      height="300px"
      testId="trading-drilldown-chart"
    />
  )
}
