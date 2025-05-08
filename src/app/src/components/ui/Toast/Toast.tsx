import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { toast as hotToast } from "react-hot-toast";

// Custom toast functions with icons
interface ToastOptions {
  id?: string;
  duration?: number;
}

// Utility for showing custom toasts
export const Toast = {
  success: (message: string, options?: ToastOptions) => {
    return hotToast.success(message, {
      ...options,
      icon: <CheckCircle className="h-5 w-5 text-success" />,
    });
  },
  error: (message: string, options?: ToastOptions) => {
    return hotToast.error(message, {
      ...options,
      icon: <XCircle className="h-5 w-5 text-error" />,
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    return hotToast.custom(
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-warning" />
        <span>{message}</span>
      </div>,
      options
    );
  },
  info: (message: string, options?: ToastOptions) => {
    return hotToast.custom(
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-info" />
        <span>{message}</span>
      </div>,
      options
    );
  },
  loading: (message: string, options?: ToastOptions) => {
    return hotToast.loading(message, options);
  },
  dismiss: (toastId?: string) => {
    if (toastId) {
      hotToast.dismiss(toastId);
    } else {
      hotToast.dismiss();
    }
  },
};
