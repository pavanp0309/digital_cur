import { 
    createUserWithEmailAndPassword, //creating the New User
    signInWithEmailAndPassword,  // Login The Existing user
    onAuthStateChanged  // to track the changes of Auth by user like Role login logout etc ..
    ,updateProfile ,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    signInWithRedirect,
    sendPasswordResetEmail,
  
} from "firebase/auth";
import { auth } from "../../../firebaseconfig";

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// custom Logic for Opening the popup

const getGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" }); // Always prompt
  return provider;
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      async queryFn({email,password}){
        try {
         let userCreditional= await createUserWithEmailAndPassword(auth, email, password)
         return {data:userCreditional.user}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),
    loginUser: builder.mutation({
    async queryFn({email,password}){
        try {
         let userCreditional= await signInWithEmailAndPassword(auth, email, password)
         return {data:userCreditional.user}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),

    logoutUser: builder.mutation({
         async queryFn(){
        try {
              await signOut(auth)
         return {data:true}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),

    googleLogin: builder.mutation({
      async queryFn() {
        try {
          const provider = getGoogleProvider();
          const result = await signInWithPopup(auth, provider);
          const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
          return { data: { user: result.user, isNewUser } };
        } catch (err) {
          return { error: { message: err.message } };
        }
      },
    }),
    updateProfile:builder.mutation({
         async queryFn({displayName,photoURL}){ // getting the data from profile page
        try {
          if(!auth.currentUser)return "no user Found" // checks waether user exists or not
              await updateProfile(auth.currentUser,{displayName,photoURL}) // used for updating the name photo in db
         return {data:{displayName,photoURL}} // returning the update value to the Ui
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),
    resetPassword:builder.mutation({
         async queryFn({email}){
        try {
              await sendPasswordResetEmail(auth, email)
         return {data:true}
        } catch (error) {
          return {err:{message:error.message}}
        }
      },
    }),
  
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useRegisterUserMutation, 
  useLoginUserMutation,
  useLogoutUserMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
  useUpdateProfileMutation,
  
} = authApi