import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
	error: string,
	rank: number | null,
	wasLastAnswerCorrect: boolean
}

const initialState: PracticeState = {
	currentQuestionIdx: 0,
	currentQuestion: null,
	score: 0,
	questions: [],
	loading: 'idle',
	error: "",
	rank: null,
	wasLastAnswerCorrect: true
}

export const fetchQuestions = createAsyncThunk(
	"practice/fetchQuestions", async (_, thunkAPI) => {
		try {
			console.log(`_ is ${JSON.stringify(_)}`);
			console.log(`thunkAPI is ${JSON.stringify(thunkAPI)}`);
			
			const response = await axios.get(`http://localhost:4001/words`);
			return await response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	});

export const submitScore = createAsyncThunk(
	"practice/submitScore", async (score: number, thunkAPI) => {
		
		try {
			const response = await axios.post(`http://localhost:4001/rank`, {
				'score': (score/ 10) * 100
			});
			console.log(`submitted real ${score} / 10 * 100`);
			
			console.log(response.data);
			return await response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	});

export const practiceSlice = createSlice({
	name: 'practice',
	initialState,
	reducers: {
		nextQuestion: (state, prevAnswer: PayloadAction<string>) => {

			console.log(`${state.currentQuestion?.pos} AND ${prevAnswer.payload}`);
			
			if (state.currentQuestion?.pos === prevAnswer.payload) {
				state.score = state.score + 1
				console.log(`OK`);
				state.wasLastAnswerCorrect = true
			} else {
				state.wasLastAnswerCorrect = false
			}

			state.currentQuestionIdx = state.currentQuestionIdx + 1

			if (state.currentQuestionIdx == 9) {
				// submit
				submitScore(state.score)
				// console.log(rank);
				
			} else {
				state.currentQuestion = state.questions[state.currentQuestionIdx]
			}
		},
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
				state.currentQuestion = payload[0]
				state.loading = "loaded";
			});
		builder.addCase(
			fetchQuestions.rejected, (state, action) => {
				state.loading = "error";
				// @ts-ignore
				state.error = action.error.error;
			});

			builder.addCase(submitScore.pending, (state) => {
				state.rank = null;
				state.loading = "loading";
			});
			builder.addCase(
				submitScore.fulfilled, (state, { payload }) => {
					// @ts-ignore
					state.rank = payload['rank'];
					state.loading = "loaded";
				});
			builder.addCase(
				submitScore.rejected, (state, action) => {
					state.loading = "error";
					// @ts-ignore
					state.error = action.error.error;
				});
	}
})

export const { nextQuestion } = practiceSlice.actions
export default practiceSlice.reducer