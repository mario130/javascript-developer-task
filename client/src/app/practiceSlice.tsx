import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import axios from "axios";
import { PracticeState } from '../types/PracticeState';

const initialState: PracticeState = {
	currentQuestionIdx: 0,
	currentQuestion: null,
	score: 0,
	questions: [],
	loading: 'loading',
	error: "",
	rank: null,
	wasLastAnswerCorrect: true
}

export const fetchQuestions = createAsyncThunk(
	"practice/fetchQuestions", async (_, thunkAPI) => {

		try {
			const response = await axios.get(`http://localhost:4001/words`);
			return await response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const submitScore = createAsyncThunk(
	"practice/submitScore", async (score: number, thunkAPI) => {

		try {
			const response = await axios.post(`http://localhost:4001/rank`, {
				'score': (score / 10) * 100
			});
			return await response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const practiceSlice = createSlice({
	name: 'practice',
	initialState,
	reducers: {
		nextQuestion: (state, prevAnswer: PayloadAction<string>) => {

			if (state.currentQuestion?.pos === prevAnswer.payload) {
				state.score = state.score + 1
				state.wasLastAnswerCorrect = true
			} else {
				state.wasLastAnswerCorrect = false
			}

			state.currentQuestionIdx = state.currentQuestionIdx + 1

			if (state.currentQuestionIdx == 9) {
				submitScore(state.score)

			} else {
				state.currentQuestion = state.questions[state.currentQuestionIdx]
			}
		},
		resetState: () => initialState
	},
	extraReducers: (builder) => {
		// fetchQuestions-related reducers
		builder.addCase(fetchQuestions.pending, (state) => {
			state.questions = [];
			state.loading = "loading";
		});
		builder.addCase(
			fetchQuestions.fulfilled, (state, { payload }) => {
				state.questions = payload;
				state.currentQuestion = payload[0]
				state.loading = "loaded";
			});
		builder.addCase(
			fetchQuestions.rejected, (state, action) => {
				state.loading = "error";
				state.error = action.error.message!;
			});

		// submitScore-related reducers
		builder.addCase(submitScore.pending, (state) => {
			state.rank = null;
			state.loading = "loading";
		});
		builder.addCase(
			submitScore.fulfilled, (state, { payload }) => {
				state.rank = payload['rank'];
				state.loading = "loaded";
			});
		builder.addCase(
			submitScore.rejected, (state, action) => {
				state.loading = "error";
				state.error = action.error.message!;
			});
	}
})

export const { nextQuestion, resetState } = practiceSlice.actions
export default practiceSlice.reducer