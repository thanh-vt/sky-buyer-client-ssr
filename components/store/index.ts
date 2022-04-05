import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import themeReducer from './themeSlice';
import tokenReducer from './tokenSlice';
import mySaga from './saga';
import createSagaMiddleware from 'redux-saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     theme: themeReducer,
//     token: tokenReducer,
//   },
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware(),
//     sagaMiddleware,
//   ],
//   devTools: true,
// });

const createStore: () => EnhancedStore = () => {
  const storeTmp = configureStore({
    reducer: {
      counter: counterReducer,
      theme: themeReducer,
      token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      sagaMiddleware,
    ],
    devTools: true,
  });
  sagaMiddleware.run(mySaga);
  return storeTmp;
};

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
