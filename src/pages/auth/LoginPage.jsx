import {useForm} from 'react-hook-form';
import {useAuth} from '../../context/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import FormCard from "../../layouts/FormCard.jsx";

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signin, isAuthenticated, errors: signInErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate('/new-service');
    }, [navigate, isAuthenticated]);


    const onSubmit = handleSubmit((data) => {
        signin(data);
    })
    return (
        <FormCard title={'LockBox - Login'}>
            {
                Array.isArray(signInErrors) && signInErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 my-2 text-white rounded' key={i}>
                        {error}
                    </div>
                ))
            }

            <form onSubmit={onSubmit} className={'text-black'}>
                <div className={'pb-[3em]'}>
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email"
                           className='w-full px-4 py-2 rounded-md my-2 placeholder-gray-800'
                           placeholder='Ingrese su correo'
                           {
                               ...register("email", {required: true})
                           }
                    />
                    {errors.email && (
                        <p className="text-red-500">Email es requerido</p>
                    )}
                    <label htmlFor="password">Contraseña</label>
                    <input type="password"
                           className='w-full px-4 py-2 rounded-md my-2 placeholder-gray-800'
                           placeholder='Ingrese su contraseña'
                           {
                               ...register("password", {required: true, minLength: 6})
                           }   />
                    {errors.password?.type === "required" && (
                        <p className="text-red-500">Password requerido</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
                    )}
                </div>

                <div className={'flex justify-between items-center'}>
                    <Link to={'/register'} className={'bg-gray-700 p-2 rounded-lg text-white'}>
                        Registrarse
                    </Link>
                    <button type='submit' className={'bg-blue-900 p-2 rounded-lg text-white'}>
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </FormCard>

    )
}

export default LoginPage