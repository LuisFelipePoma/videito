import { useState, FormEvent } from "react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Mail, LogIn, Lock } from "lucide-react";
import { useNavigate } from "react-router";

export const LoginLayout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Aquí iría la llamada a la API de autenticación
    setIsSubmitting(false);
    navigate("/app/home");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-lighttext">
            Correo electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-lighttextsec" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              className={`bg-background pl-10 ${
                errors.email ? "border-error" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-xs text-error mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-lighttext"
            >
              Contraseña
            </label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-lighttextsec" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className={`bg-background pl-10 ${
                errors.password ? "border-error" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              required
            />
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs text-error mt-1">
              {errors.password}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⟳</span>
            Procesando...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar Sesión
          </>
        )}
      </Button>
    </form>
  );
};
