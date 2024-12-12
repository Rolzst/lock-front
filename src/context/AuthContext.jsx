import {createContext, useState, useContext, useEffect} from "react";
import {registerRequest, loginRequest, verifyTokenRequest, logoutRequest, updateRequest} from "../api/auth";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar definido en un contexto');
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    }// fin de signip

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error)
            setErrors([error.response.data.message]);
        }
    }// fin de signin

    const updateProfile = async (user) => {
        try {
            const res = await updateRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error)
            setErrors([error.response.data.message]);
        }
    };//fin del updateProfile

    const logout = () => {
        logoutRequest();
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get(); // Obtenemos las cookies almacenadas en el cliente
            // console.log(cookies.token); // (opcional) Para depuración: mostrar el token en la consola

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                // En caso de que sí exista un token, lo verificamos
                const res = await verifyTokenRequest(cookies.token); // Llamada a la API para verificar el token

                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return setUser(null);
                }

                // En caso de que exista un token válido y se obtengan datos del usuario
                setIsAuthenticated(true); // El usuario está autenticado
                setUser(res.data);
                setLoading(false); // Establecemos los datos del usuario
            } catch (error) {
                // Capturamos errores en la validación del token
                console.log(error); // Mostramos el error en la consola
                setIsAuthenticated(false);
                setLoading(false); // El usuario no está autenticado
                setUser(null); // Establecemos los datos del usuario en null
            }
        }

        checkLogin(); // Llamamos a la función al inicializar el componente
    }, []); // [] asegura que el efecto solo se ejecute una vez (en el montaje del componente)


    return (
        <AuthContext.Provider value={{
            signin,
            signup,
            logout,
            updateProfile,
            user,
            isAuthenticated,
            errors,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}// fin de Autrpvaideer
AuthProvider.propTypes = {
    children: PropTypes.any
}
  