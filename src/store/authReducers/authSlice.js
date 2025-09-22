
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: null,
    loading: true, // start true until Firebase confirms
  },
  reducers: {
    setUser: (state, action) => {
      //  store only serializable fields
      const { uid, email, displayName, photoURL } = action.payload || {};
      state.user = uid ? { uid, email, displayName, photoURL } : null;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
