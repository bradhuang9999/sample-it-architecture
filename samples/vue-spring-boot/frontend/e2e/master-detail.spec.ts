import { expect, test } from '@playwright/test'

test('Master Detail 頁面包含 Master Form 與 Detail Grid', async ({ page }) => {
  await page.goto('/#/master-detail')

  await expect(page.getByRole('heading', { name: 'Product / Trading Master Detail' })).toBeVisible()
  await expect(page.getByTestId('product-selector')).toBeVisible()
  await expect(page.getByTestId('product-master-form')).toBeVisible()
  await expect(page.getByTestId('trading-detail-grid')).toBeVisible()
})
