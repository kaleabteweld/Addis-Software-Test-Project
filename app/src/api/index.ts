import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const appURL = import.meta.env.VITE_APP_URL;

export const songAPI = createApi({
    reducerPath: 'songAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: appURL + '/Api/v1/public/song',
    }),
    endpoints: () => ({}),
    tagTypes: ["Song"],
})

export default songAPI;