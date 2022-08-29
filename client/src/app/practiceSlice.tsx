import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PracticeState {
    currentQuestion: number,
    score: number
}

const initialState: PracticeState = {
    currentQuestion: 0,
    score: 0
}

export const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        nextQuestion: (state, prevAnswer: PayloadAction<number>) => {
            state.currentQuestion = state.currentQuestion + 1
        },
    },
})

export const { nextQuestion } = practiceSlice.actions

export default practiceSlice.reducer