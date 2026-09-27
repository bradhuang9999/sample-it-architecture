import { expect, test } from '@playwright/test'

test('Dashboard 載入後顯示 KPI、Product Chart 與 Drill-down', async ({ page }) => {
  await page.goto('/#/dashboard')

  await expect(page.getByRole('heading', { name: 'Product Trading Dashboard' })).toBeVisible()
  await expect(page.getByTestId('dashboard-summary')).toBeVisible()
  await expect(page.getByTestId('product-summary-chart')).toBeVisible()
  await expect(page.getByTestId('dashboard-drilldown')).toBeVisible()
  await expect(page.getByTestId('trading-drilldown-chart')).toBeVisible()
  await expect(page.getByTestId('dashboard-drilldown-grid')).toBeVisible()
})
