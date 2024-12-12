import FormCard from "../layouts/FormCard.jsx";
import {useForm} from "react-hook-form";
import {useServicio} from "../context/ServicioContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function ServiceFormPage() {
    const {createServicio,errServicios} = useServicio();
    const {user} = useAuth();
    const navigate = useNavigate();
    const {
        register, handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            user: user.id
        }
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        createServicio(data);
        navigate('/see-services');
    });

    return (
        <FormCard title={'Crea una nueva contraseña'}>
            <form onSubmit={onSubmit}>
                <div className={'pb-[3em]'}>
                    <ul>
                        {
                            errServicios.map((error) => (
                                <li key={error}>{error}</li>
                            ))
                        }
                    </ul>
                    <input type="hidden"
                           {...register("user", {required: true})}  />
                    <label htmlFor="email_serv">
                        Correo electrónico
                    </label>
                    <input type="email"
                           className='w-full px-4 py-2 rounded-md my-2 text-black'
                           placeholder='Correo'
                           {
                               ...register("email_serv", {required: true})
                           }
                    />
                    {errors.email_serv && (
                        <p className="text-red-500">El correo electrónico es requerido</p>
                    )}
                    <label htmlFor="nom_servicio">
                        Nombre del servicio
                    </label>
                    <input type="nom_servicio"
                           className='w-full px-4 py-2 rounded-md my-2 text-black'
                           placeholder='Nombre del servicio'
                           {
                               ...register("nom_servicio", {required: true})
                           }   />
                    {errors.nom_servicio?.type === "required" && (
                        <p className="text-red-500">EL nombre del servicio es requerido</p>
                    )}
                    <label htmlFor="contrasenia">
                        Contraseña
                    </label>
                    <input type="password"
                           className='w-full px-4 py-2 rounded-md my-2 text-black'
                           placeholder='Password'
                           {
                               ...register("contrasenia", {required: true})
                           }   />
                    {errors.contrasenia?.type === "required" && (
                        <p className="text-red-500">La contraseña es requerida</p>
                    )}

                </div>

                <div className={'flex justify-end items-center'}>
                    <button type='submit' className={'bg-blue-900 p-2 rounded-lg text-white'}>
                        Crear
                    </button>
                </div>
            </form>
        </FormCard>
    )
}

export default ServiceFormPage