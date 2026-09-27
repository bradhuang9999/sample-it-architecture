function el(id) {
  return document.getElementById(id);
}

function showMessage(message, type = 'danger') {
  const box = el('dashboard-message');
  box.className = `alert alert-${type}`;
  box.textContent = message;
}

async function api(url) {
  const response = await fetch(url);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.detail || `HTTP ${response.status}`);
  return body;
}

function money(value) {
  return Number(value).toLocaleString('zh-TW', { maximumFractionDigits: 2 });
}

async function loadDashboard() {
  if (typeof echarts === 'undefined') {
    throw new Error('ECharts 未載入。若公司環境禁止外網，請將核准版本放到內部靜態資源。');
  }

  const [summary, products] = await Promise.all([
    api('/api/dashboard/summary'),
    api('/api/dashboard/products'),
  ]);

  el('product-count').textContent = summary.productCount;
  el('trading-count').textContent = summary.tradingCount;
  el('total-amount').textContent = money(summary.totalTradingAmount);
  el('currency-code').textContent = summary.currencyCode;

  const productChart = echarts.init(el('product-chart'));
  const monthlyChart = echarts.init(el('monthly-chart'));

  productChart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 50, right: 20, top: 30, bottom: 60 },
    xAxis: {
      type: 'category',
      data: products.map(p => p.prodCode),
      axisLabel: { interval: 0 },
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Trading Amount',
      type: 'bar',
      data: products.map(p => ({ value: Number(p.tradingAmount), prodId: p.prodId, prodName: p.prodName })),
    }],
  });

  async function drilldown(prodId, prodName) {
    const [monthly, trades] = await Promise.all([
      api(`/api/dashboard/products/${prodId}/monthly`),
      api(`/api/dashboard/products/${prodId}/trades`),
    ]);

    el('selected-product-label').textContent = `- ${prodName}`;
    monthlyChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 55, right: 20, top: 30, bottom: 45 },
      xAxis: { type: 'category', data: monthly.map(item => item.month) },
      yAxis: { type: 'value' },
      series: [{
        name: 'Monthly Amount',
        type: 'line',
        smooth: true,
        data: monthly.map(item => Number(item.tradingAmount)),
      }],
    });

    el('drilldown-table-body').innerHTML = trades.map(t => `
      <tr>
        <td>${t.tradeDate}</td>
        <td>${t.tradeType}</td>
        <td>${t.counterparty}</td>
        <td class="text-end">${money(t.tradeAmount)}</td>
      </tr>
    `).join('');
  }

  productChart.on('click', params => {
    drilldown(params.data.prodId, params.data.prodName).catch(error => showMessage(error.message));
  });

  if (products.length) {
    await drilldown(products[0].prodId, products[0].prodName);
  }

  window.addEventListener('resize', () => {
    productChart.resize();
    monthlyChart.resize();
  });
}

loadDashboard().catch(error => showMessage(error.message));
