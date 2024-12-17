import React, { useState } from "react";
import FormCard from "../layouts/FormCard.jsx";
import { useForm } from "react-hook-form";
import { useServicio } from "../context/ServicioContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn"; // Medidor de fuerza de contraseñas
import CryptoJS from "crypto-js"; // Librería compatible para generar SHA-1

function ServiceFormPage() {
  const { createServicio, errServicios } = useServicio();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isCompromised, setIsCompromised] = useState(null);
  const [checkingCompromise, setCheckingCompromise] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      user: user.id,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createServicio(data);
    navigate("/see-services");
  });

  const handlePasswordChange = async (e) => {
    const password = e.target.value;
    setValue("contrasenia", password);

    // Evaluar la fuerza de la contraseña
    const strength = zxcvbn(password);
    setPasswordStrength(strength.score);

    // Verificar contraseña comprometida
    await checkPasswordCompromise(password);
  };

  const checkPasswordCompromise = async (password) => {
    setCheckingCompromise(true);
    setIsCompromised(null);

    try {
      // Generar hash SHA-1 usando crypto-js
      const hash = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      // Llamada a la API
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();

      // Buscar coincidencias en los resultados
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
    <FormCard title={"Crea una nueva contraseña"}>
      <form onSubmit={onSubmit}>
        <div className={"pb-[3em]"}>
          <ul>
            {errServicios.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>

          {/* Correo Electrónico */}
          <label htmlFor="email_serv">Correo electrónico</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md my-2 text-black"
            placeholder="Correo"
            {...register("email_serv", { required: true })}
          />
          {errors.email_serv && (
            <p className="text-red-500">El correo electrónico es requerido</p>
          )}

          {/* Nombre del Servicio */}
          <label htmlFor="nom_servicio">Nombre del servicio</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md my-2 text-black"
            placeholder="Nombre del servicio"
            {...register("nom_servicio", { required: true })}
          />
          {errors.nom_servicio?.type === "required" && (
            <p className="text-red-500">El nombre del servicio es requerido</p>
          )}

          {/* Contraseña */}
          <label htmlFor="contrasenia">Contraseña</label>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 rounded-md my-2 text-black"
          />
          {errors.contrasenia?.type === "required" && (
            <p className="text-red-500">La contraseña es requerida</p>
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

        {/* Botón de Crear */}
        <div className={"flex justify-end items-center"}>
          <button
            type="submit"
            className={
              `p-2 rounded-lg text-white ${isCompromised || checkingCompromise 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-900 hover:bg-blue-700"}`
            }
            disabled={isCompromised || checkingCompromise}
          >
            Crear
          </button>
        </div>
      </form>
    </FormCard>
  );
}

export default ServiceFormPage;

