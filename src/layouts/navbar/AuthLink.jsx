import {useAuth} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

function AuthLink() {
    const {isAuthenticated, user} = useAuth();

    console.log(user);
    if (isAuthenticated)
        return <h1>{user.username}</h1>
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
