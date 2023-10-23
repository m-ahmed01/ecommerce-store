

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters, fetchBrands, fetchCategories, fetchProductById, createProduct, updateProduct } from './productApi';

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

// Not using anywhere
// export const fetchAllProductsAsync = createAsyncThunk(
//   'product/fetchAllProducts',
//   async () => {
//     const response = await fetchAllProducts();
//     return response.data;
//   }
// );

// for Product-Detail page
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id); // id of product
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter, sort,pagination,admin}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination,admin);

    return response.data;
  }
);


// FOR API

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();

    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/create',   // createProduct
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',   // createProduct
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);




// API ENDS

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
   
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null;
    }

  },

  extraReducers: (builder) => {
    builder
    // Not using anywhere
      // .addCase(fetchAllProductsAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products = action.payload;
      // })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      }) // below is for product-Detail page
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);  // new product here
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex((product)=> product.id === action.payload.id);
        state.products[index] = action.payload;  // updated product here
        state.selectedProduct = action.payload; // comeback to that product page immediately and update status of deleted
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
// FOR API
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
// API ENDS
// For Product-detail
export const selectProductById = (state) => state.product.selectedProduct;

export const selectProductListStatus = (state) => state.product.status;

export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductDetailStatus = (state) => state.product.status;

export default productSlice.reducer;
