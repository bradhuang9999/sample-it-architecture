interface ErrorAlertProps {
  message: string
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )
}
