interface LoadingPanelProps {
  message?: string
}

export function LoadingPanel({
  message = '資料載入中…'
}: LoadingPanelProps) {
  return (
    <div className="py-5 text-center text-secondary" role="status">
      <span
        className="spinner-border spinner-border-sm me-2"
        aria-hidden="true"
      />
      {message}
    </div>
  )
}
