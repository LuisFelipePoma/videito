import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@components/ui/Buttons/Button";
import { Input } from "@components/ui/Input";
import { User, Mail, School, UserPlus, Lock } from "lucide-react";
import { UserRegisterRequest } from "../services/types";
import { Role } from "../../../core/types/user";
import { useMutRegister } from "../services/useMutRegister";

// Define the validation schema with Zod
const registerSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.nativeEnum(Role),
}) satisfies z.ZodType<UserRegisterRequest>;

// Infer the type from the schema
type FormValues = z.infer<typeof registerSchema>;

export const RegisterLayout = () => {
  const mutationRegister = useMutRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    mutationRegister.mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-lighttext"
          >
            Nombre
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-lighttextsec" />
            <Input
              id="firstName"
              placeholder="Juan"
              className={`bg-background pl-10 ${
                errors.firstName ? "border-error" : ""
              }`}
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
          </div>
          {errors.firstName && (
            <p id="firstName-error" className="text-xs text-error mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-lighttext"
          >
            Apellido
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-lighttextsec" />
            <Input
              id="lastName"
              placeholder="Pérez"
              className={`bg-background pl-10 ${
                errors.lastName ? "border-error" : ""
              }`}
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
          </div>
          {errors.lastName && (
            <p id="lastName-error" className="text-xs text-error mt-1">
              {errors.lastName.message}
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
              type="email"
              placeholder="tu@email.com"
              className={`bg-background pl-10 ${
                errors.email ? "border-error" : ""
              }`}
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-xs text-error mt-1">
              {errors.email.message}
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
              type="password"
              placeholder="••••••••"
              className={`bg-background pl-10 ${
                errors.password ? "border-error" : ""
              }`}
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs text-error mt-1">
              {errors.password.message}
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
              className={`w-full rounded-md border p-2 pl-10 h-10 bg-background ${
                errors.role ? "border-error" : ""
              }`}
              {...register("role")}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? "role-error" : undefined}
            >
              <option value="" disabled>
                Selecciona tu rol
              </option>
              <option value="student">Estudiante</option>
              <option value="docent">Profesor</option>
            </select>
          </div>
          {errors.role && (
            <p id="role-error" className="text-xs text-error mt-1">
              {errors.role.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={mutationRegister.isPending}
      >
        {mutationRegister.isPending ? (
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
