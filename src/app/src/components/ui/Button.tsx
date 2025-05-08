import * as React from "react";

// Definimos los tipos de variantes disponibles
type ButtonVariant = "default" | "outline" | "ghost" | "link" | "subtle";
type ButtonColor =
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "warning";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className = "",
  children,
  variant = "default",
  color = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  // Base classes que siempre se aplican
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // Classes de tamaño
  const sizeClasses = {
    sm: "h-8 px-3 py-1 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-base",
  };

  // Clases para cada combinación de variante y color
  const variantColorClasses: Record<
    ButtonVariant,
    Record<ButtonColor, string>
  > = {
    default: {
      primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
      secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
      destructive:
        "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      success: "bg-success hover:bg-success/90 text-white",
      warning: "bg-warning hover:bg-warning/90 text-white",
    },
    outline: {
      primary:
        "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      secondary:
        "border border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground",
      destructive:
        "border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
      success:
        "border border-success text-success hover:bg-success hover:text-white",
      warning:
        "border border-warning text-warning hover:bg-warning hover:text-white",
    },
    ghost: {
      primary: "text-primary hover:bg-primary/10",
      secondary: "text-secondary-foreground hover:bg-secondary/10",
      destructive: "text-destructive hover:bg-destructive/10",
      success: "text-success hover:bg-success/10",
      warning: "text-warning hover:bg-warning/10",
    },
    link: {
      primary: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      secondary:
        "text-secondary-foreground underline-offset-4 hover:underline p-0 h-auto",
      destructive:
        "text-destructive underline-offset-4 hover:underline p-0 h-auto",
      success: "text-success underline-offset-4 hover:underline p-0 h-auto",
      warning: "text-warning underline-offset-4 hover:underline p-0 h-auto",
    },
    subtle: {
      primary: "bg-primary/10 text-primary hover:bg-primary/20",
      secondary:
        "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
      destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
      success: "bg-success/10 text-success hover:bg-success/20",
      warning: "bg-warning/10 text-warning hover:bg-warning/20",
    },
  };

  // Combinamos todas las clases
  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    variantColorClasses[variant][color],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
