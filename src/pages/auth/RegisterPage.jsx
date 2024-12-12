import {useForm} from 'react-hook-form';
import {useAuth} from '../../context/AuthContext.jsx';
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormCard from "../../layouts/FormCard.jsx";

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated)
            navigate('/')
    }, [isAuthenticated, navigate])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })
    return (
        <FormCard title={'LockBox - Register'}>
            {
                registerErrors.map((errors, i) => (
                    <div className='bg-red-500 p-2 my-2 text-white' key={i}>
                        {errors}
                    </div>
                ))
            }
            <form onSubmit={onSubmit} className={'text-black'}>
                <div className={'pb-[3em]'}>
                    <label htmlFor="username">
                        Nombre de usuario
                    </label>
                    <input type="text"
                           className='w-full px-4 py-2 rounded-md my-2 placeholder-gray-800'
                           placeholder='Username'
                           {
                               ...register("username", {required: true, minLength: 5})
                           }
                    />
                    {errors.username?.type === "required" && (
                        <p className="text-red-500">Nombre de usuario requerido</p>
                    )}
                    {errors.username?.type === "minLength" && (
                        <p className="text-red-500">La longitud mínima es de 5 caracteres</p>
                    )}
                    <label htmlFor="email">
                        Correo electrónico
                    </label>
                    <input type="email"
                           className='w-full px-4 py-2 rounded-md my-2 placeholder-gray-800'
                           placeholder='Email'
                           {
                               ...register("email", {
                                   required: true,
                                   pattern: {
                                       value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                       message: 'Porfavor entre un Email valido',
                                   },
                               })
                           }
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500">Email es requirido</p>
                    )}
                    {errors.email?.message && (
                        <p className="text-red-500">Email no valido</p>
                    )}
                    <label htmlFor="password">
                        Contraseña
                    </label>
                    <input type="password"
                           className='w-full px-4 py-2 rounded-md my-2 placeholder-gray-800'
                           placeholder='Password'
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
                    <Link to={'/login'} className={'bg-gray-700 p-2 rounded-lg text-white'}>
                        Iniciar sesión
                    </Link>
                    <button type='submit' className={'bg-blue-900 p-2 rounded-lg text-white'}>
                        Registrarse
                    </button>
                </div>
            </form>
        </FormCard>
    );
}

export default RegisterPage;
  