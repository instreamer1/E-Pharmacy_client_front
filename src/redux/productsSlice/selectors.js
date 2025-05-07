import { createSelector } from '@reduxjs/toolkit';

export const selectProducts = state => state.products.products;

export const selectProduct = state => state.products.product;

export const selectTotal = state => state.products.total;

export const selectPage = state => state.products.page;

export const selectLimit = state => state.products.limit;

export const selectTotalPages = state => state.products.totalPages;



export const selectCategoriesRaw= state => state.products.categories;


export const selectCategory = (state) => state.products.category;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectProductsError = state => state.products.error;
export const selectProductsLoading = state => state.products.isLoading;

export const selectCategories = createSelector(
    [selectCategoriesRaw],
    (categories) => categories
  );

// export const selectProductCategories = createSelector(
//     [selectSelectedCategory],
//     (products) => {
//       const categories = products.map((product) => product.category);
//       const uniqueCategories = Array.from(new Set(categories));
//       return uniqueCategories;
//     }
//   );