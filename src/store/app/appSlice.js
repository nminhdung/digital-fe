import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncThunks";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: [],
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
    brands: [],
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = true;
      state.modalChildren = action.payload.modalChildren;
    },
    closeModal: (state, action) => {
      state.isShowModal = false;
      state.modalChildren = action.payload.modalChildren;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getCategories.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(actions.getBrands.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands = action.payload;
    });
    builder.addCase(actions.getBrands.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { showModal, closeModal, showCart, getSubTotal } =
  appSlice.actions;
export default appSlice.reducer;
