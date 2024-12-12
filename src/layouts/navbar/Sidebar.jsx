import React from "react";
import {
    IconButton,
    List,
    ListItem,
    Drawer,
    Card,
} from "@material-tailwind/react";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import AuthSidebar from "./AuthSidebar.jsx";

export function Sidebar() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const {isAuthenticated} = useAuth();

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2 text-white"/>
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2 text-white"/>
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer} className={'bg-blue-gray-900 '}>
                <Card
                    color="transparent"
                    shadow={false}
                    className="h-[calc(100vh-2rem)] w-full p-4"
                >
                    <div className="mb-2 flex justify-center items-center gap-4 p-4 rounded-lg">
                        <img className={'w-16 h-16'}
                             src="https://res.cloudinary.com/dmmlxlio3/image/upload/v1734040288/kkh7z3uvzfpota73pniw.jpg"
                             alt="No se encontro la imagen"/>

                    </div>
                    <List className={`flex flex-col h-full ${isAuthenticated ? 'justify-between' : 'justify-end'}`}>
                        {
                            isAuthenticated &&
                            <div>
                                <hr className="my-2 border-blue-gray-50"/>
                                <Link to={'/new-service'} onClick={closeDrawer}>
                                    <ListItem>
                                        Crear nueva contraseña
                                    </ListItem>
                                </Link>
                                <Link to={`/see-services`} onClick={closeDrawer}>
                                    <ListItem>
                                        Registros
                                    </ListItem>
                                </Link>


                            </div>
                        }
                        <AuthSidebar funcion={closeDrawer}/>
                    </List>
                </Card>
            </Drawer>
        </>
    );
}