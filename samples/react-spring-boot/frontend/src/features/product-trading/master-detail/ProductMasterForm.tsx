import { useState } from 'react'
import type { FormEvent } from 'react'

import type {
  Product,
  ProductStatus,
  ProductUpdateRequest
} from '../model/product-trading.types'

interface ProductMasterFormProps {
  product: Product
  saving: boolean
  onSave: (request: ProductUpdateRequest) => void
}

const statuses: ProductStatus[] = ['ACTIVE', 'INACTIVE']

function toForm(product: Product): ProductUpdateRequest {
  return {
    prodCode: product.prodCode,
    prodName: product.prodName,
    prodCategory: product.prodCategory,
    prodStatus: product.prodStatus,
    currencyCode: product.currencyCode,
    listPrice: product.listPrice,
    effectiveDate: product.effectiveDate,
    ownerDeptCode: product.ownerDeptCode,
    remark: product.remark,
    rowVersion: product.rowVersion
  }
}

export function ProductMasterForm({
  product,
  saving,
  onSave
}: ProductMasterFormProps) {
  const [form, setForm] = useState<ProductUpdateRequest>(() => toForm(product))

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    onSave({
      ...form,
      prodCode: form.prodCode.trim(),
      prodName: form.prodName.trim(),
      prodCategory: form.prodCategory.trim(),
      currencyCode: form.currencyCode.trim().toUpperCase(),
      ownerDeptCode: form.ownerDeptCode.trim(),
      remark: form.remark?.trim() || null
    })
  }

  return (
    <section className="card app-card mb-4" data-testid="product-master-form">
      <div className="card-header d-flex align-items-center justify-content-between">
        <div>
          <div className="section-title">Product Master</div>
          <div className="small text-secondary">SAMPLE_PROD</div>
        </div>
        <span className="badge text-bg-light border">ID {product.prodId}</span>
      </div>

      <form className="card-body" onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label" htmlFor="prodCode">Product Code</label>
            <input
              id="prodCode"
              value={form.prodCode}
              onChange={(event) => setForm(current => ({
                ...current,
                prodCode: event.target.value
              }))}
              className="form-control"
              maxLength={20}
              required
            />
          </div>

          <div className="col-md-5">
            <label className="form-label" htmlFor="prodName">Product Name</label>
            <input
              id="prodName"
              value={form.prodName}
              onChange={(event) => setForm(current => ({
                ...current,
                prodName: event.target.value
              }))}
              className="form-control"
              maxLength={100}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="prodCategory">Category</label>
            <input
              id="prodCategory"
              value={form.prodCategory}
              onChange={(event) => setForm(current => ({
                ...current,
                prodCategory: event.target.value
              }))}
              className="form-control"
              maxLength={30}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="prodStatus">Status</label>
            <select
              id="prodStatus"
              value={form.prodStatus}
              onChange={(event) => setForm(current => ({
                ...current,
                prodStatus: event.target.value as ProductStatus
              }))}
              className="form-select"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="currencyCode">Currency</label>
            <input
              id="currencyCode"
              value={form.currencyCode}
              onChange={(event) => setForm(current => ({
                ...current,
                currencyCode: event.target.value
              }))}
              className="form-control text-uppercase"
              maxLength={3}
              pattern="[A-Za-z]{3}"
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label" htmlFor="listPrice">List Price</label>
            <input
              id="listPrice"
              value={form.listPrice}
              onChange={(event) => setForm(current => ({
                ...current,
                listPrice: Number(event.target.value)
              }))}
              className="form-control"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label" htmlFor="effectiveDate">Effective Date</label>
            <input
              id="effectiveDate"
              value={form.effectiveDate}
              onChange={(event) => setForm(current => ({
                ...current,
                effectiveDate: event.target.value
              }))}
              className="form-control"
              type="date"
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="ownerDeptCode">Owner Department</label>
            <input
              id="ownerDeptCode"
              value={form.ownerDeptCode}
              onChange={(event) => setForm(current => ({
                ...current,
                ownerDeptCode: event.target.value
              }))}
              className="form-control"
              maxLength={20}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="productRemark">Remark</label>
            <textarea
              id="productRemark"
              value={form.remark ?? ''}
              onChange={(event) => setForm(current => ({
                ...current,
                remark: event.target.value
              }))}
              className="form-control"
              rows={2}
              maxLength={500}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              />
            )}
            儲存 Master
          </button>
        </div>
      </form>
    </section>
  )
}
