import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function CommonModal({body}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(body);
        } catch (error) {
            alert('Error al copiar al portapapeles' + error);
        }
    };
    return (
        <>
            <button onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>&#160;&#160;
                    Cuida quien ve a tu al rededor
                </DialogHeader>
                <DialogBody>
                    {body}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="green"
                        onClick={copiar}
                        className="mr-1"
                    >
                        <span>Copiar</span>
                    </Button>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cerrar</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

CommonModal.propTypes = {
    body: PropTypes.string,
}
