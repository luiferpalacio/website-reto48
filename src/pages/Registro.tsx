import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { type RegisterFormData, TipoDocumento } from '../types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo no valido').required('El correo electrónico es obligatorio'),
  password: yup.string().min(8, 'La contraseña debe tener minimo 8 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es obligatoria'),
  tipoDocumento: yup.mixed<TipoDocumento>().oneOf(Object.values(TipoDocumento), 'Seleccione un tipo de documento').required('El tipo de documento es obligatorio'),
  documentoComprador: yup.number().typeError('El documento del comprador debe ser un numero').required('El documento es obligatorio'),
  celularComprador: yup.string().length(10, 'El celular debe tener 10 numeros').required('El celular es obligatorio'),
  // direccionComprador: yup.string().required('La dirección es obligatoria'),
});

const documentTypes = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PAS', label: 'Pasaporte' },
  { value: 'OTRO', label: 'Otro' },
];

export const Registro = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/clientes', data);
      const { original } = response.data;
      const { user, message } = original;

      if (message !== 'OK') throw new Error(message);

      if (user) {
        localStorage.setItem('user', user);
        navigate('/productos');
        toast.success('Registro exitoso');
      }
    } catch (error: unknown) {
      toast.error('Error: ' + (error instanceof Error ? error.message : 'Algo salió mal'));
    }
  };

  return (
    <div className="p-12 min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor='name' className='block text-sm font-semibold text-gray-700'>
              Nombre Completo
            </label>
            <input
              type='text'
              id='name'
              {...register('name')}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <label htmlFor='tipoDocumento' className='block text-sm font-semibold text-gray-700'>
              Tipo de Documento
            </label>
            <select
              id='tipoDocumento'
              {...register('tipoDocumento')}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Seleccione</option>
              {documentTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.tipoDocumento && <p className='text-red-500 text-sm'>{errors.tipoDocumento.message}</p>}
          </div>

          <div>
            <label htmlFor='documentoComprador' className='block text-sm font-semibold text-gray-700'>
              Documento
            </label>
            <input
              type='number'
              id='documentoComprador'
              {...register('documentoComprador')}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.documentoComprador && <p className='text-red-500 text-sm'>{errors.documentoComprador.message}</p>}
          </div>

          <div>
            <label htmlFor='celularComprador' className='block text-sm font-semibold text-gray-700'>
              Celular del Comprador
            </label>
            <input
              type='number'
              id='celularComprador'
              {...register('celularComprador')}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.celularComprador && <p className='text-red-500 text-sm'>{errors.celularComprador.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Crear Cuenta
          </button>

          <div className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
