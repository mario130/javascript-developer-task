import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export interface questionObj {
    id: number,
    word: string,
    pos: string
}

export interface PracticeState {
    currentQuestionIdx: number,
    currentQuestion: questionObj | null,
    score: number,
    questions: questionObj[],
    loading: string,
    error: string
}

const initialState: PracticeState = {
    currentQuestionIdx: 0,
    currentQuestion: null,
    score: 0,
    questions: [],
    loading: 'idle',
    error: ""
}

export const fetchQuestions = createAsyncThunk(
    "practice/fetchQuestions", async (_, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:4001/words`);
            return await response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        nextQuestion: (state, prevAnswer: PayloadAction<number>) => {
            state.currentQuestionIdx = state.currentQuestionIdx + 1
        },
        setQuestions: (state, questions: PayloadAction<questionObj[]>) => {
            state.questions = questions.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.questions = [];
            state.loading = "loading";
        });
        builder.addCase(
            fetchQuestions.fulfilled, (state, { payload }) => {
                // @ts-ignore
                state.questions = payload;
                state.loading = "loaded";
            });
        builder.addCase(
            fetchQuestions.rejected,(state, action) => {
                state.loading = "error";
                // @ts-ignore
                state.error = action.error.error;
            });
    }
})

export const { nextQuestion } = practiceSlice.actions
export default practiceSlice.reducer