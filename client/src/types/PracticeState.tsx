import { QuestionObj } from './QuestionObj';

export interface PracticeState {
	currentQuestionIdx: number;
	currentQuestion: QuestionObj | null;
	score: number;
	questions: QuestionObj[];
	loading: string;
	error: string;
	rank: number | null;
	wasLastAnswerCorrect: boolean;
}
