import { createSelector } from '@reduxjs/toolkit';

export const selectProducts = state => state.products.products;

export const selectProduct = state => state.products.product;

export const selectTotal = state => state.products.total;

export const selectPage = state => state.products.page;

export const selectLimit = state => state.products.limit;

export const selectTotalPages = state => state.products.totalPages;

export const selectCategories = state => state.products.categories;

export const selectLastQuery = state => state.products.lastQuery;


export const selectCategory = (state) => state.products.category;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectProductsError = state => state.products.error;
export const selectProductsLoading = state => state.products.isLoading;


// export const selectCategories = createSelector(
//   [selectCategoriesBase],
//   (categories) => categories
// );

// export const selectProducts = createSelector(
//   [selectProductsBase],
//   (products) => products
// );