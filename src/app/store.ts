import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import gamesReducer from '../redux/gamesSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export const fetchWithRetry = async (url: URL, options: any, retries = 3) : Promise<any> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        if (retries > 0) {
          return fetchWithRetry(url, options, retries - 1);
        }
        throw err;
    }
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
