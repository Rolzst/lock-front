import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {useServicio} from "../context/ServicioContext.jsx";

export function     DeleteModal({body, id}) {
    const [open, setOpen] = React.useState(false);
    const {deleteServicio} = useServicio();

    const handleOpen = () => setOpen(!open);
    const eliminar = async (id) => {
        deleteServicio(id);
        handleOpen();
        window.location.reload();
    };
    return (
        <>
            <button onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"/>
                </svg>
            </button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>

                    ¿Estás seguro de eliminar la contraseña?
                </DialogHeader>
                <DialogBody>
                    {body}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="green"
                        onClick={() => eliminar(id)}
                        className="mr-1"
                    >
                        <span>Confirmar</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

DeleteModal.propTypes = {
    body: PropTypes.string,
    id: PropTypes.string.isRequired,
}
