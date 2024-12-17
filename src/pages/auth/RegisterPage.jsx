import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "../../layouts/FormCard.jsx";
import zxcvbn from "zxcvbn"; // Librería para medir la fuerza de la contraseña
import CryptoJS from "crypto-js"; // Librería para generar SHA-1 compatible con el navegador

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isCompromised, setIsCompromised] = useState(null);
  const [checkingCompromise, setCheckingCompromise] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  // Función para manejar cambios en la contraseña
  const handlePasswordChange = async (e) => {
    const password = e.target.value;
    setValue("password", password);

    // Evaluar la fuerza de la contraseña
    const strength = zxcvbn(password);
    setPasswordStrength(strength.score);

    // Verificar si la contraseña ha sido comprometida
    await checkPasswordCompromise(password);
  };

  // Verificar contraseña comprometida usando HIBP
  const checkPasswordCompromise = async (password) => {
    setCheckingCompromise(true);
    setIsCompromised(null);

    try {
      const hash = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();

      const compromised = data
        .split("\n")
        .some((line) => {
          const [lineSuffix] = line.split(":");
          return lineSuffix === suffix;
        });

      setIsCompromised(compromised);
    } catch (error) {
      console.error("Error al verificar la contraseña:", error);
      setIsCompromised(false);
    } finally {
      setCheckingCompromise(false);
    }
  };

  const strengthLevels = ["Muy Débil", "Débil", "Regular", "Fuerte", "Muy Fuerte"];

  return (
    <FormCard title={"LockBox - Register"}>
      {registerErrors.map((errors, i) => (
        <div className="bg-red-500 p-2 my-2 text-white" key={i}>
          {errors}
        </div>
      ))}

      <form onSubmit={onSubmit} className={"text-black"}>
        <div className={"pb-[3em]"}>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md my-2 placeholder-gray-800"
            placeholder="Username"
            {...register("username", { required: true, minLength: 5 })}
          />
          {errors.username?.type === "required" && (
            <p className="text-red-500">Nombre de usuario requerido</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-red-500">La longitud mínima es de 5 caracteres</p>
          )}

          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md my-2 placeholder-gray-800"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Por favor entre un Email válido",
              },
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email es requerido</p>
          )}
          {errors.email?.message && <p className="text-red-500">{errors.email.message}</p>}

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 rounded-md my-2 placeholder-gray-800"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password requerido</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
          )}

          {/* Medidor de Fuerza */}
          <div className="mt-2">
            <p>Fuerza de la contraseña: {strengthLevels[passwordStrength]}</p>
            <div className="h-2 bg-gray-200 rounded">
              <div
                style={{ width: `${(passwordStrength + 1) * 20}%` }}
                className={`h-full ${
                  passwordStrength < 2
                    ? "bg-red-500"
                    : passwordStrength < 4
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
            </div>
          </div>

          {/* Verificación de Contraseña Comprometida */}
          <div className="mt-2">
            {checkingCompromise && <p>Verificando contraseña...</p>}
            {isCompromised !== null && (
              <p className={`text-sm ${isCompromised ? "text-red-500" : "text-green-500"}`}>
                {isCompromised
                  ? "⚠️ Esta contraseña ha sido comprometida en filtraciones públicas."
                  : "✅ Esta contraseña no aparece en filtraciones públicas."}
              </p>
            )}
          </div>
        </div>

        <div className={"flex justify-between items-center"}>
          <Link to={"/login"} className={"bg-gray-700 p-2 rounded-lg text-white"}>
            Iniciar sesión
          </Link>
          <button
            type="submit"
            className={`p-2 rounded-lg text-white ${
              isCompromised || checkingCompromise
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
            disabled={isCompromised || checkingCompromise}
          >
            Registrarse
          </button>
        </div>
      </form>
    </FormCard>
  );
}

export default RegisterPage;
