import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct , fetchCategories , fetchBrands, fetchProductByFilter, fetchProductById, createProduct, updateProduct} from './productAPI';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProduct();

    return response.data;
  }
);


export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
   async ({filter,sort,pagination}) => {
   // console.log('f',filter,sort);
    const response = await fetchProductByFilter(filter,sort,pagination);
    return response.data;
  }
);


export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchCategories();

    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchBrands();

    return response.data;
  }
);


export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);


export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
       state.selectedProduct=null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload.products;
        state.totalItems=action.payload.totalItems
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories=action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands=action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct=action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex(product=>product.id===action.payload.id)
        state.products[index]=action.payload
        state.selectedProduct=action.payload
      })


  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItem=(state)=>state.product.totalItems
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;


export default productSlice.reducer;
