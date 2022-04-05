import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'theme-dark' | 'theme-light';

export interface ThemeState {
  value: Theme;
}

const initialState: ThemeState = {
  value: 'theme-light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.value = 'theme-dark';
      } else {
        state.value = 'theme-light';
      }
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
