import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const organizationApi = createApi({
  reducerPath: 'organizationApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/organizations` }),
  endpoints: (builder) => ({
    addOrganizations: builder.mutation({
      query: (organizations) => ({
        url: '/all',
        method: 'post',
        body: organizations
      })
    }),
    deleteOrganization: builder.mutation({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: 'delete'
      })
    }),
    getPaginatedOrganizations: builder.query({
      query: ({ page, limit }) => ({
        url: '/paginated/all',
        method: 'get',
        params: { page, limit }
      })
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddOrganizationsMutation,
  useGetPaginatedOrganizationsQuery,
  useDeleteOrganizationMutation
} = organizationApi;
