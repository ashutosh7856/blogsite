type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose?: () => void
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  const bg = type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : 'bg-gray-100'
  const text = type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-gray-800'

  return (
    <div className={`fixed right-4 bottom-6 z-50 ${bg} ${text} px-4 py-2 rounded-md shadow-md`} role="status">
      <div className="flex items-center gap-3">
        <div className="flex-1">{message}</div>
        <button onClick={onClose} className="text-sm font-medium opacity-70">Close</button>
      </div>
    </div>
  )
}
