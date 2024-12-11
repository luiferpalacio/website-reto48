import { Venta } from '../types';

const API_BASE_URL = 'http://localhost:8000/api'; // Cambia esto según tu configuración.

export const getCompraventas = async (): Promise<Venta[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/compraventas`);
    return response.json();
  } catch (error) {
    console.error('Error fetching compraventas:', error);
    return [];
  }
};
