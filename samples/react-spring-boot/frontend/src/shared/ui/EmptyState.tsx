interface EmptyStateProps {
  message?: string
}

export function EmptyState({
  message = '目前沒有資料。'
}: EmptyStateProps) {
  return (
    <div className="empty-state text-secondary text-center py-4">
      {message}
    </div>
  )
}
