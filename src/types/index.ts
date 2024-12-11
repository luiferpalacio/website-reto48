export interface Product {
  id: number;
  Categoria_id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  precioventa: number;
  library: {
    images: string[];
  };
}

export interface Category {
  id: number;
  nombre: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Venta {
  id: number; // bigint unsigned
  fecha: string | null; // datetime, formato ISO 8601 (ejemplo: '2024-12-10T10:00:00Z')
  proveedor_id: number | null; // bigint unsigned, puede ser null
  cliente_id: number | null; // bigint unsigned, puede ser null
  total: number | null; // double, puede ser null
  estado: 'PROCESO' | 'TERMINADO'; // enum ('PROCESO', 'TERMINADO')
  tipo: 'COMPRA' | 'VENTA'; // enum ('COMPRA', 'VENTA')
  created_at: string | null; // timestamp, formato ISO 8601
  updated_at: string | null; // timestamp, formato ISO 8601
  deleted_at: string | null; // timestamp, formato ISO 8601, puede ser null
}
