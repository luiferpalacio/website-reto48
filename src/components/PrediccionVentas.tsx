import React, { useEffect, useState } from 'react';
import { getCompraventas } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Venta } from '../types';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale, // Escala de categorías (eje X)
  LinearScale, // Escala lineal (eje Y)
  BarElement, // Barras
  Title, // Título
  Tooltip, // Tooltip
  Legend // Leyenda
);

const PrediccionVentas = () => {
  const [, setVentas] = useState<Venta[]>([]);
  const [, setPrediccion] = useState<(number | null)[]>([]);
  // const [chartData, setChartData] = useState<{ labels: string[], datasets: { label: string, data: number[], borderColor: string, fill: boolean, borderDash?: number[] }[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompraventas();
      const ventasFiltradas = data.filter(item => item.tipo === 'VENTA' && item.estado === 'TERMINADO');
      setVentas(ventasFiltradas);

      // Generar predicciones básicas
      if (ventasFiltradas.length > 1) {
        const precios = ventasFiltradas.map(venta => venta.total).filter((total): total is number => total !== null);
        // const fechas = ventasFiltradas.map(venta => venta.fecha ? new Date(venta.fecha).toLocaleDateString() : '');

        // Predicción básica: media móvil
        const prediccionBasica = precios.map((_, i, arr) => {
          if (i === 0) return arr[i];
          return ((arr[i - 1] ?? 0) + (arr[i] ?? 0)) / 2;
        });

        setPrediccion(prediccionBasica);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      // Destruir el gráfico si existe
      Object.values(ChartJS.instances).forEach((chartInstance) => chartInstance?.destroy());
    };
  }, []);

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        label: 'Ventas',
        data: [3000, 4000, 3500, 5000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predicción de Ventas',
      },
    },
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
      <Bar data={data} options={options} width={400} height={300} />
    </div>
  );
};

export default PrediccionVentas;
