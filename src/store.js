import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { organizationApi } from './services/organization';
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [organizationApi.reducerPath]: organizationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(organizationApi.middleware)
});
