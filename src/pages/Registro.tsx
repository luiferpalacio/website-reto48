import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const registerSchema = yup.object().shape({
  name: yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es obligatorio'),
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de la contraseña es obligatoria'),
  documentoComprador: yup
    .number()
    .typeError('El documento debe ser un número')
    .required('El documento es obligatorio'),
  tipoDocumento: yup
    .string()
    .oneOf(['CC', 'CE', 'NIT', 'PAS', 'OTRO'], 'Selecciona un tipo de documento válido')
    .required('El tipo de documento es obligatorio'),
  nombreComprador: yup.string().required('El nombre del comprador es obligatorio'),
  apellidoComprador: yup.string().required('El apellido del comprador es obligatorio'),
  celularComprador: yup
    .string()
    .matches(/^[0-9]{10}$/, 'El celular debe tener 10 dígitos')
    .required('El celular es obligatorio'),
  direccionComprador: yup.string().required('La dirección es obligatoria'),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  documentoComprador: number;
  tipoDocumento: 'CC' | 'CE' | 'NIT' | 'PAS' | 'OTRO';
  nombreComprador: string;
  apellidoComprador: string;
  celularComprador: string;
  direccionComprador: string;
};

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
    alert('Datos enviados: ' + JSON.stringify(data, null, 2));
    try {
      const response = await axios.post('http://localhost:8000/api/clientes', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { original } = response.data;
      const { user, message } = original;

      if (message !== 'OK') throw new Error(message);

      if (user) {
        localStorage.setItem('user', user);

        // Redirigir a la página de inicio
        navigate('/productos');
      }

    }
    catch (error: unknown) {
      toast.error('Error: ' + (error instanceof Error ? error.message : 'Algo salió mal'));
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campos existentes */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Nuevos campos */}
          <div>
            <label htmlFor="documentoComprador" className="block text-sm font-semibold text-gray-700">
              Documento
            </label>
            <input
              type="number"
              id="documentoComprador"
              {...register('documentoComprador')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.documentoComprador && (
              <p className="text-red-500 text-sm">{errors.documentoComprador.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tipoDocumento" className="block text-sm font-semibold text-gray-700">
              Tipo de Documento
            </label>
            <select
              id="tipoDocumento"
              {...register('tipoDocumento')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione</option>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="NIT">NIT</option>
              <option value="PAS">PAS</option>
              <option value="OTRO">OTRO</option>
            </select>
            {errors.tipoDocumento && <p className="text-red-500 text-sm">{errors.tipoDocumento.message}</p>}
          </div>

          <div>
            <label htmlFor="nombreComprador" className="block text-sm font-semibold text-gray-700">
              Nombre del Comprador
            </label>
            <input
              type="text"
              id="nombreComprador"
              {...register('nombreComprador')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nombreComprador && <p className="text-red-500 text-sm">{errors.nombreComprador.message}</p>}
          </div>

          <div>
            <label htmlFor="apellidoComprador" className="block text-sm font-semibold text-gray-700">
              Apellido del Comprador
            </label>
            <input
              type="text"
              id="apellidoComprador"
              {...register('apellidoComprador')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.apellidoComprador && <p className="text-red-500 text-sm">{errors.apellidoComprador.message}</p>}
          </div>

          <div>
            <label htmlFor="celularComprador" className="block text-sm font-semibold text-gray-700">
              Celular del Comprador
            </label>
            <input
              type="text"
              id="celularComprador"
              {...register('celularComprador')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.celularComprador && <p className="text-red-500 text-sm">{errors.celularComprador.message}</p>}
          </div>

          <div>
            <label htmlFor="direccionComprador" className="block text-sm font-semibold text-gray-700">
              Dirección del Comprador
            </label>
            <textarea
              id="direccionComprador"
              {...register('direccionComprador')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.direccionComprador && <p className="text-red-500 text-sm">{errors.direccionComprador.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Registrarse
            </button>
          </div>

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
