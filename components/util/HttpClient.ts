import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { store } from '../store';
import { updateToken } from '../store/tokenSlice';

export interface TokenResponse {
  // eslint-disable-next-line camelcase
  access_token: string;
  // eslint-disable-next-line camelcase
  expires_in: number;
  // eslint-disable-next-line camelcase
  refresh_expires_in: number;
  // eslint-disable-next-line camelcase
  refresh_token: string;
  // eslint-disable-next-line camelcase
  token_type: 'Bearer ';
  // eslint-disable-next-line camelcase
  id_token: string;
  'not-before-policy': number;
  // eslint-disable-next-line camelcase
  session_state: string;
  scope: string;
}

//cau hinh axios
export const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function refreshToken(): Promise<AxiosResponse<TokenResponse>> {
  return httpClient.post<TokenResponse>(
    '/token',
    {
      // eslint-disable-next-line camelcase
      grant_type: 'refresh_token',
      scope: 'openid',
      refreshToken: store.getState().token.refreshToken,
    },
    { baseURL: process.env.REACT_APP_KEYCLOAK_BASE_URL }
  );
}

// Request interceptor for API calls
httpClient.interceptors.request.use(
  async (config) => {
    const savedToken = store.getState().token;
    if (savedToken.existed) {
      const token = savedToken.accessToken;
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response parse
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await refreshToken();
      store.dispatch(updateToken(res.data));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.access_token}`;
      return httpClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
