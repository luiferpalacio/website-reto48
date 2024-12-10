export interface Product {
  id: number;
  categoria_id: number;
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