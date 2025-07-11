
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getDiscountedProducts,
  getProductById,
} from './productsAPI';


export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const data = await getAllProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const fetchDiscountedProducts = createAsyncThunk(
  'products/fetchDiscountedProducts',
  async (_, thunkAPI) => {
    try {
      const data = await getDiscountedProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    try {
      const data = await getProductById(id);
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


const initialState = {
  productsList: [],
  selectedProduct: null,
  loading: false,
  error: null,
};


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDiscountedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchDiscountedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
