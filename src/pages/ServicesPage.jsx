import {useServicio} from "../context/ServicioContext.jsx";
import {useEffect} from "react";
import { Card, Typography } from "@material-tailwind/react";
import {CommonModal} from "../components/CommonModal.jsx";
import {DeleteModal} from "../components/DeleteModal.jsx";

function ServicesPage() {
    const {servicios, getServicios} = useServicio();
    const TABLE_HEAD = ["Correo electrónico", "Nombre del servicio", "Contraseña", "Fecha de cración"];

    useEffect(() => {
        getServicios();
    }, [servicios]);

    return (
        <div className={'p-7'}>
            <Card className="h-full w-full overflow-scroll px-6 text-black">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {servicios.map(({ _id, email_serv, nom_servicio, contrasenia, createdAt }, index) => {
                        const isLast = index === servicios.length - 1;
                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                        return (
                            <tr key={email_serv} className="hover:bg-gray-50">
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {email_serv}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {nom_servicio}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className={'flex flex-row'}>
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600 truncate max-w-[50px]"
                                        >
                                            ***********
                                        </Typography>
                                        <CommonModal body={contrasenia} />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {createdAt}
                                    </Typography>
                                </td>
                                <td>
                                    <DeleteModal body={contrasenia} id={_id}/>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

export default ServicesPage;
