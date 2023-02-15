import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "../Features/Api";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
};



export const productFetch = createAsyncThunk(
  "products/productFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);



export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const DeleteProducts = createAsyncThunk(
  "products/DeleteProducts",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },



    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.items.push(action.payload);
      toast.success("Product Created Successfully");
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },



    [DeleteProducts.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [DeleteProducts.fulfilled]: (state, action) => {

      const newList = state.items.filter((item) => item._id !== action.payload._id)

      state.items = newList

      state.deleteStatus = "success";
      state.items.push(action.payload);
      toast.error("Product has deleted Successfully");
    },
    [DeleteProducts.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default ProductSlice.reducer;
