import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserInfoResponse {
  username?: string;
  dateOfBirth?: Date;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface UserState {
  username?: string;
  dateOfBirth?: Date;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserLoginRequest>) => {
      console.log(state, action);
    },
    logout: (state) => state,
    fetchUserInfo: (state) => state,
    fetchUserInfoSuccess: (
      state,
      actionPayload: PayloadAction<UserInfoResponse>
    ) => {
      return {
        ...state,
        ...actionPayload.payload,
      };
    },
    fetchUserInfoFailed: (state) => {
      console.log(state);
      return {};
    },
  },
});

export const {
  login,
  logout,
  fetchUserInfo,
  fetchUserInfoSuccess,
  fetchUserInfoFailed,
} = userSlice.actions;

export default userSlice.reducer;
