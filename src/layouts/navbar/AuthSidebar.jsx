import {useAuth} from "../../context/AuthContext.jsx";
import {PowerIcon} from "@heroicons/react/24/solid/index.js";
import {ListItem, ListItemPrefix} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function AuthSidebar({funcion}) {
    const {isAuthenticated, logout} = useAuth();
    if (isAuthenticated)
        return( <ListItem to={'/logout'} onClick={() => {logout(); funcion();}}>
        <ListItemPrefix>
            <PowerIcon className="h-5 w-5"/>
        </ListItemPrefix>
            Cerrar sesión
    </ListItem>);

    return (
        <>
            <ListItem>
                <Link to={'/login'} onClick={funcion}>
                    Iniciar sesión
                </Link>
            </ListItem>
            <ListItem>
                <Link to={'/register'} onClick={funcion}>
                    Registrarse
                </Link>
            </ListItem>
        </>
    );
}
AuthSidebar.propTypes = {
    funcion: PropTypes.func,
}

export default AuthSidebar;