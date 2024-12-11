import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

type LoginFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('http://localhost:8000/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Manejar el token recibido
      const { access_token } = response.data;
      localStorage.setItem('authToken', access_token);
      alert('Inicio de sesión exitoso');
    } catch (error: any) {
      // Manejar errores
      if (error.response) {
        alert(error.response.data.message || 'Error al iniciar sesión');
      } else {
        alert('Error de red');
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Iniciar Sesión
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="/registro" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
