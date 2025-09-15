import { 
    createUserWithEmailAndPassword, //creating the New User
    signInWithEmailAndPassword,  // Login The Existing user
    onAuthStateChanged  // to track the changes of Auth by user like Role login logout etc ..
    ,updateProfile ,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInWithRedirect
} from "firebase/auth";
import { auth } from "../../../firebaseconfig";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      async queryFn(){
        try {
         let userCreditional= await createUserWithEmailAndPassword(auth, email, password)
         return {data:userCreditional}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),
    loginUser: builder.mutation({
    async queryFn(){
        try {
         let userCreditional= await signInWithEmailAndPassword(auth, email, password)
         return {data:userCreditional}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),

    logoutUser: builder.mutation({
         async queryFn(){
        try {
              await signOut()
         return {data:true}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),,
    }),

    googleLoginUser: builder.mutation({
      query: () => '',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi