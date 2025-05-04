import { useState, FormEvent } from "react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { User, Mail, School, UserPlus, Lock } from "lucide-react";

export const RegisterLayout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.role) {
      newErrors.role = "Selecciona un rol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Aquí iría la llamada a la API de registro
      console.log("Registrando usuario:", formData);
      // await registerUser(formData);

      // Redireccionar tras el registro exitoso
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-lighttext">
            Nombre completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-lighttextsec" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Pérez"
              className={`bg-background pl-10 ${
                errors.name ? "border-error" : ""
              }`}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
          </div>
          {errors.name && (
            <p id="name-error" className="text-xs text-error mt-1">
              {errors.name}
            </p>
          )}
        </div>

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
              value={formData.email}
              onChange={handleChange}
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
          <label
            htmlFor="password"
            className="text-sm font-medium text-lighttext"
          >
            Contraseña
          </label>
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
              value={formData.password}
              onChange={handleChange}
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

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium text-lighttext">
            Rol
          </label>
          <div className="relative">
            <School className="absolute left-3 top-3 h-4 w-4 text-lighttextsec" />
            <select
              id="role"
              name="role"
              className={`w-full rounded-md border p-2 pl-10 h-10 bg-background ${
                errors.role ? "border-error" : ""
              }`}
              value={formData.role}
              onChange={handleChange}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? "role-error" : undefined}
              required
            >
              <option value="" disabled>
                Selecciona tu rol
              </option>
              <option value="student">Estudiante</option>
              <option value="teacher">Profesor</option>
            </select>
          </div>
          {errors.role && (
            <p id="role-error" className="text-xs text-error mt-1">
              {errors.role}
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
            <UserPlus className="mr-2 h-4 w-4" />
            Crear Cuenta
          </>
        )}
      </Button>
    </form>
  );
};
