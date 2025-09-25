// src/redux/features/cart/cartSlice.ts
import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { TProduct, TProductSize } from "../../../components/E-Commerce/ProductsSection/ProductsSection";

// Product coming from API
export type ProductSize = {
  _id: string;
  size: string;
  quantity: number;
  basePrice: number;
  discountedPrice: number;
  color:string;
};


export type CartItem = {
  productId: string;
  sizeId: string;
  color:string;
  size: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
  state,
  action: PayloadAction<{ product: TProduct; size: TProductSize; quantity: number; color: string }>
) => {
  const { product, size, quantity, color } = action.payload;

  const existingItem = state.items.find(
    (i) => i.productId === product._id && i.sizeId === size._id && i.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.items.push({
      productId: product._id,
      sizeId: size._id,
      size: size.size,
      name: product.name,
      price: size.discountedPrice,
      quantity,
      image: product.imageUrls[0] || "",
      color,
    });
  }
},


    removeFromCart: (state, action: PayloadAction<{ productId: string; sizeId: string }>) => {
      state.items = state.items.filter(
        (i) => !(i.productId === action.payload.productId && i.sizeId === action.payload.sizeId)
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; sizeId: string; quantity: number }>
    ) => {
      const { productId, sizeId, quantity } = action.payload;
      const item = state.items.find((i) => i.productId === productId && i.sizeId === sizeId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
    
  },
});

export const getCartProducts = (state: RootState) => {
  return state.cart.items.map((item) => ({
    productId: item.productId,
    sizeId: item.sizeId,
    name: item.name,
    size: item.size,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    totalPrice: item.price * item.quantity,
    color:item.color
  }));
};
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
