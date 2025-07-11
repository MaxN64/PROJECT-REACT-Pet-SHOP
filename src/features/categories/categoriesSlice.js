import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories, getProductsByCategory } from './categoriesAPI';


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const data = await getAllCategories();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка загрузки категорий');
    }
  }
);


export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProductsByCategory',
  async (categoryId, thunkAPI) => {
    try {
      const products = await getProductsByCategory(categoryId);
      return { categoryId, products };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка загрузки продуктов категории');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    byId: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
     
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
     
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.byId[action.meta.arg] = { items: [], status: 'loading', error: null };
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { categoryId, products } = action.payload;
        state.byId[categoryId] = { items: products, status: 'succeeded', error: null };
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.byId[action.meta.arg] = { items: [], status: 'failed', error: action.payload };
      });
  }
});

export default categoriesSlice.reducer;
