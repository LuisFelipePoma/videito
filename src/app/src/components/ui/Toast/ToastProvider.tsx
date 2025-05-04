import React from "react";
import { Toaster } from "react-hot-toast";

interface ToastProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  reverseOrder?: boolean;
}

// Custom toast component with the Toaster provider
export const ToastProvider: React.FC<ToastProps> = ({
  position = "top-right",
  reverseOrder = false,
}) => {
  return (
    <Toaster
      position={position}
      reverseOrder={reverseOrder}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#0a0a0a",
          border: "1px solid #e5e5e5",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          fontSize: "14px",
          maxWidth: "420px",
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: "#0cb663",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff3333",
            secondary: "white",
          },
        },
      }}
    />
  );
};
