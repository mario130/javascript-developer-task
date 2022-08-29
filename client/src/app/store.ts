import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import practiceReducer from "./practiceSlice";

export const store = configureStore({
  reducer: {
    practice: practiceReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
