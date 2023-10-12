import { apiSlice } from "../services/apiSlice";

interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  created_at: string;
  updated_at: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({
        name,
        email,
        password,
        re_password,
        country,
        language_code,
      }) => ({
        url: "/users/",
        method: "POST",
        body: { name, email, password, re_password, country, language_code },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
    activation: builder.mutation({
      query: ({ uid, token, language_code }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token, language_code },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, language_code }) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email, language_code },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({
        language_code,
        uid,
        token,
        new_password,
        re_new_password,
      }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { language_code, uid, token, new_password, re_new_password },
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authApiSlice;
