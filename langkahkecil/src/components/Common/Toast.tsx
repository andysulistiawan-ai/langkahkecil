import { useToast, ToastType } from '@/hooks/useToast';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export function ToastContainer({ toasts, dismissToast }: { toasts: { id: string; message: string; type: ToastType }[]; dismissToast: (id: string) => void }) {
  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-green-400" />,
    error: <XCircle size={18} className="text-red-400" />,
    info: <Info size={18} className="text-blue-400" />,
    warning: <AlertTriangle size={18} className="text-yellow-400" />,
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2 max-w-[380px] w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-gray-900 text-white text-sm rounded-sm px-4 py-3 shadow-lg animate-[slideUp_300ms_ease-out]"
        >
          {icons[toast.type]}
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => dismissToast(toast.id)} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export { useToast };
