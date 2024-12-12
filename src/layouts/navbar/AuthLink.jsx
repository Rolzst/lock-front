import {useAuth} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

function AuthLink() {
    const {isAuthenticated, logout} = useAuth();

    if (isAuthenticated)
        return <Link to={'/logout'} onClick={() => { logout() }}>Cerrar sesión</Link>
    return (
        <>
            <Link to={'/login'} className={'hover:bg-blue-900 p-3 hover:rounded-lg'}>
                Iniciar sesión
            </Link>
            <Link to={'/register'} className={'hover:bg-blue-900 p-3 hover:rounded-lg'}>
                Registrarse
            </Link>
        </>
    );

}

export default AuthLink;
