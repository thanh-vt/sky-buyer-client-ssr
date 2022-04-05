import { all, call, put, takeLatest } from 'redux-saga/effects';
import { httpClient, TokenResponse } from '../util/HttpClient';
import {
  fetchUserInfo,
  fetchUserInfoFailed,
  fetchUserInfoSuccess,
  login,
  logout,
  UserInfoResponse,
  UserLoginRequest,
} from './userSlice';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { clearToken, updateToken } from './tokenSlice';
import { AllEffect } from '@redux-saga/core/effects';
import * as queryString from 'querystring';

function* fetchUser() {
  try {
    const user: AxiosResponse<UserInfoResponse> = yield call(() =>
      httpClient.get<UserInfoResponse>('')
    );
    yield put({ type: fetchUserInfoSuccess.type, payload: user });
  } catch (e: unknown) {
    yield put({
      type: fetchUserInfoFailed.type,
      payload: (e as Error).message,
    });
  }
}

function* onLogin(action: PayloadAction<UserLoginRequest>) {
  try {
    const res: AxiosResponse<TokenResponse> = yield call(() =>
      httpClient({
        method: 'POST',
        data: queryString.stringify({
          // eslint-disable-next-line camelcase
          grant_type: 'password',
          scope: 'openid',
          username: action.payload.username,
          password: action.payload.password,
        }),
        url: '/token',
        baseURL: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            btoa(
              `${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}:${process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET}`
            ),
        },
      })
    );
    yield put({ type: updateToken.type, payload: res.data });
    yield put({ type: fetchUserInfo.type });
  } catch (e: unknown) {
    yield put({ type: logout.type });
  }
}

function* storeToken(action: PayloadAction<TokenResponse>) {
  window.localStorage.setItem('accessToken', action.payload.access_token);
  window.localStorage.setItem('refreshToken', action.payload.refresh_token);
  yield;
}

function* onLogout() {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
  yield put({ type: clearToken.type });
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga(): Generator<AllEffect<unknown>> {
  yield all([
    takeLatest(login.type, onLogin),
    takeLatest(logout.type, onLogout),
    takeLatest(fetchUserInfo.type, fetchUser),
    takeLatest(updateToken.type, storeToken),
  ]);
}

export default mySaga;
