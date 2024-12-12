import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import {createServicioRequest, deleteServicioRequest, verServicioRequest} from "../api/servicios.js";
import {useAuth} from "./AuthContext.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const ServicioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useServicio = () => {
    const context = useContext(ServicioContext);
    if (!context) {
        throw new Error('useServicio debe estar definido en un contexto');
    }
    return context;
}

export const ServicioProvider = ({children}) => {
    const [servicios, setServicios] = useState([]);
    const [errServicios, setErrServicios] = useState([]);
    const [password, setPassword] = useState(null);

    const generatePasswords = async () => {
        try {
            const res = await fetch('https://api.api-ninjas.com/v1/passwordgenerator?length=16', {
                headers: {
                    'x-api-key': import.meta.env.VITE_PASSWORD_KEY,
                }
            })
            const data = await res.json();
            setPassword(data)
            console.log(data);
        } catch (error) {
            setErrServicios([error.response.data.message]);
            console.log([error.response.data.message]);
        }
    }
    const createServicio = async (servicio) => {
        try {
            const res = await createServicioRequest(servicio);
            console.log(res);
        } catch (error) {
            setErrServicios([error.response.data.message]);
            console.log([error.response.data.message]);
        }
    }// fin de createServicio

    const getServicios = async () => {
        try {
            const res = await verServicioRequest();
            setServicios(res.data);
            console.log(res.data);
        } catch (error) {
            console.log('oh no');
            console.log([error.response.data.message]);
        }
    }// fin de createServicio

    const deleteServicio = async (id) => {
        try {
            const res = await deleteServicioRequest(id);
            setServicios(res.data);
            console.log(res.data);
        } catch (error) {
            console.log('oh no');
            console.log([error.response.data.message]);
        }
    }
    return (
        <ServicioContext.Provider value={{
            createServicio,
            getServicios,
            generatePasswords,
            deleteServicio,
            password,
            servicios,
            errServicios
        }}>
            {children}
        </ServicioContext.Provider>
    )
}// fin de Autrpvaideer
ServicioProvider.propTypes = {
    children: PropTypes.any
}
