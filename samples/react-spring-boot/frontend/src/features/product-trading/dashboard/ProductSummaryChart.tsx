import type { EChartsOption } from 'echarts'
import { useMemo } from 'react'

import {
  EChart,
  type ChartClickEvent
} from '../../../shared/chart/EChart'
import type { ProductTradingAggregate } from '../model/product-trading.types'

interface ProductSummaryChartProps {
  items: ProductTradingAggregate[]
  onSelect: (item: ProductTradingAggregate) => void
}

export function ProductSummaryChart({
  items,
  onSelect
}: ProductSummaryChartProps) {
  const option = useMemo<EChartsOption>(() => ({
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
      data: items.map(item => item.prodCode)
    },
    yAxis: {
      type: 'value',
      name: 'Trading Amount'
    },
    series: [
      {
        name: 'Trading Amount',
        type: 'bar',
        data: items.map(item => item.tradingAmount),
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  }), [items])

  function handleChartClick(event: ChartClickEvent): void {
    const item = items[event.dataIndex]
    if (item) {
      onSelect(item)
    }
  }

  return (
    <EChart
      option={option}
      height="360px"
      testId="product-summary-chart"
      onChartClick={handleChartClick}
    />
  )
}
