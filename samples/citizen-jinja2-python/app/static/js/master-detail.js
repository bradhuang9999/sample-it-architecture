const state = {
  selectedProdId: null,
  trades: [],
  editingTradingId: null,
};

function el(id) {
  return document.getElementById(id);
}

function showMessage(message, type = 'success') {
  const box = el('page-message');
  box.className = `alert alert-${type}`;
  box.textContent = message;
}

function hideMessage() {
  el('page-message').className = 'alert d-none';
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (response.status === 204) return null;

  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.detail || `HTTP ${response.status}`);
  return body;
}

function money(value) {
  return Number(value).toLocaleString('zh-TW', { maximumFractionDigits: 2 });
}

async function loadProducts() {
  const products = await api('/api/products');
  const select = el('product-select');
  select.innerHTML = products
    .map(p => `<option value="${p.prodId}">${p.prodCode} - ${p.prodName}</option>`)
    .join('');

  if (products.length) {
    state.selectedProdId = Number(select.value);
    await loadSelectedProduct();
  }
}

async function loadSelectedProduct() {
  if (!state.selectedProdId) return;
  hideMessage();
  const [product, trades] = await Promise.all([
    api(`/api/products/${state.selectedProdId}`),
    api(`/api/products/${state.selectedProdId}/trades`),
  ]);
  renderProduct(product);
  state.trades = trades;
  renderTrades();
}

function renderProduct(product) {
  el('prod-id').value = product.prodId;
  el('prod-row-version').value = product.rowVersion;
  el('prod-code').value = product.prodCode;
  el('prod-name').value = product.prodName;
  el('prod-category').value = product.prodCategory;
  el('prod-status').value = product.prodStatus;
  el('currency-code').value = product.currencyCode;
  el('list-price').value = product.listPrice;
  el('effective-date').value = product.effectiveDate;
  el('owner-dept-code').value = product.ownerDeptCode;
  el('prod-remark').value = product.remark || '';
}

function renderTrades() {
  el('trading-table-body').innerHTML = state.trades.map(t => `
    <tr>
      <td>${t.tradeDate}</td>
      <td>${t.tradeType}</td>
      <td>${t.counterparty}</td>
      <td class="text-end">${t.quantity}</td>
      <td class="text-end">${money(t.unitPrice)}</td>
      <td class="text-end fw-semibold">${money(t.tradeAmount)}</td>
      <td>${t.marketCode || ''}</td>
      <td class="text-end text-nowrap">
        <button class="btn btn-sm btn-outline-secondary" data-action="edit" data-id="${t.tradingId}">編輯</button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${t.tradingId}">刪除</button>
      </td>
    </tr>
  `).join('');
}

function clearTradeForm() {
  state.editingTradingId = null;
  el('trade-form').reset();
  el('trading-id').value = '';
  el('trade-row-version').value = '';
  el('trade-type').value = 'BUY';
}

function openTradeEditor(trade = null) {
  el('trade-form').classList.remove('d-none');
  clearTradeForm();
  if (!trade) return;

  state.editingTradingId = trade.tradingId;
  el('trading-id').value = trade.tradingId;
  el('trade-row-version').value = trade.rowVersion;
  el('trade-date').value = trade.tradeDate;
  el('trade-type').value = trade.tradeType;
  el('counterparty').value = trade.counterparty;
  el('quantity').value = trade.quantity;
  el('unit-price').value = trade.unitPrice;
  el('market-code').value = trade.marketCode || '';
  el('trade-remark').value = trade.remark || '';
}

function tradePayload() {
  const rowVersion = el('trade-row-version').value;
  return {
    tradeDate: el('trade-date').value,
    tradeType: el('trade-type').value,
    counterparty: el('counterparty').value.trim(),
    quantity: el('quantity').value,
    unitPrice: el('unit-price').value,
    marketCode: el('market-code').value.trim() || null,
    remark: el('trade-remark').value.trim() || null,
    rowVersion: rowVersion ? Number(rowVersion) : null,
  };
}

el('product-select').addEventListener('change', async event => {
  state.selectedProdId = Number(event.target.value);
  await loadSelectedProduct();
});

el('product-form').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const payload = {
      prodName: el('prod-name').value.trim(),
      prodCategory: el('prod-category').value.trim(),
      prodStatus: el('prod-status').value,
      listPrice: el('list-price').value,
      effectiveDate: el('effective-date').value,
      ownerDeptCode: el('owner-dept-code').value.trim(),
      remark: el('prod-remark').value.trim() || null,
      rowVersion: Number(el('prod-row-version').value),
    };
    const updated = await api(`/api/products/${state.selectedProdId}`, {
      method: 'PUT', body: JSON.stringify(payload),
    });
    renderProduct(updated);
    showMessage('Master 已儲存。');
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

el('new-trade-button').addEventListener('click', () => openTradeEditor());
el('cancel-trade-button').addEventListener('click', () => {
  clearTradeForm();
  el('trade-form').classList.add('d-none');
});

el('trade-form').addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const payload = tradePayload();
    const url = state.editingTradingId
      ? `/api/products/${state.selectedProdId}/trades/${state.editingTradingId}`
      : `/api/products/${state.selectedProdId}/trades`;
    const method = state.editingTradingId ? 'PUT' : 'POST';
    await api(url, { method, body: JSON.stringify(payload) });
    el('trade-form').classList.add('d-none');
    clearTradeForm();
    await loadSelectedProduct();
    showMessage('Trading 已儲存。');
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

el('trading-table-body').addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const trade = state.trades.find(item => item.tradingId === id);
  if (!trade) return;

  if (button.dataset.action === 'edit') {
    openTradeEditor(trade);
    return;
  }

  if (button.dataset.action === 'delete' && confirm('確定刪除這筆 Trading？')) {
    try {
      await api(
        `/api/products/${state.selectedProdId}/trades/${id}?rowVersion=${trade.rowVersion}`,
        { method: 'DELETE' },
      );
      await loadSelectedProduct();
      showMessage('Trading 已刪除。');
    } catch (error) {
      showMessage(error.message, 'danger');
    }
  }
});

loadProducts().catch(error => showMessage(error.message, 'danger'));
