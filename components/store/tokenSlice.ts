import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenResponse } from '../util/HttpClient';

export interface TokenState {
  accessToken: string;
  refreshToken: string;
  existed: boolean;
}

const initialState: TokenState = {
  accessToken: '',
  refreshToken: '',
  existed: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    initToken: (state) => {
      if (localStorage.getItem('accessToken')) {
        state.accessToken = localStorage.getItem('accessToken') as string;
        state.refreshToken = localStorage.getItem('refreshToken') as string;
        state.existed = true;
      } else {
        state.accessToken = '';
        state.refreshToken = '';
        state.existed = false;
      }
    },
    updateToken: (state, action: PayloadAction<TokenResponse>) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.existed = true;
    },
    clearToken: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.existed = false;
    },
  },
});

export const { initToken, updateToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
