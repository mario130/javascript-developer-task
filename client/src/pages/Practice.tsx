import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, nextQuestion, questionObj, resetState, submitScore } from "../app/practiceSlice";
import { RootState } from '../app/store';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Practice() {
	const dispatch = useDispatch();
	useEffect(() => {
		// @ts-ignore
		dispatch(resetState());
		// @ts-ignore
		dispatch(fetchQuestions())
	}, [])
	const navigate = useNavigate();

	const currentQuestionIdx: number = useSelector((state: RootState) => state.practice.currentQuestionIdx);
	const currentQuestion: questionObj = useSelector((state: RootState) => state.practice.questions[currentQuestionIdx]);
	const wasLastAnswerCorrect: boolean = useSelector((state: RootState) => state.practice.wasLastAnswerCorrect);
	const score: number = useSelector((state: RootState) => state.practice.score);

	const posValues = ['adjective', 'adverb', 'noun', 'verb']

	function onSelectAnswer(ans: string) {
		dispatch(nextQuestion(ans));

		if (currentQuestionIdx === 9) {
			// Submit score
			// BUG - TODO: last question's score is not added so we check it manually
			let add1 = false
			if (currentQuestion.pos === ans) add1 = true
			// @ts-ignore
			dispatch(submitScore(add1 ? score + 1 : score))
			console.log(`Submitted score ${score}`);
			navigate('/rank')
		}
	}

	return (
		<div className='m-auto'>
			<div className='mx-4 bg-secondary rounded-2xl p-6 max-w-sm text-white'>
			<div className='rounded-3xl w-fit'>
				<img
					width="40"
					src="/nagwa.png"
					alt="star icon"
				/>
			</div>
			<h1 className='text-2xl font-semibold my-4'>Which part of speech does this word belong to?</h1>
			<p className='text-pink-500 underline font-bold text-center py-4'>{currentQuestion ? currentQuestion.word : ''}</p>
			{/* choice buttons */}
			<div className='flex items-stretch flex-wrap pt-6 justify-between'>
				{
					currentQuestionIdx < 10 && posValues.map(pos =>
						<button
							key={pos}
							onClick={() => onSelectAnswer(pos)}
							value={pos}
							className={"hover:bg-gray-500 active:bg-primary active:text-white transition-all  p-2 mb-4 grow rounded-lg"}
						>{`${pos}`}
						</button>
					)
				}
				<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
					<div className={` ${wasLastAnswerCorrect ? 'bg-green-500' : 'bg-red-500'} h-2.5 rounded-full transition-all`} style={{ "width": (currentQuestionIdx / 10) * 100 + "%" }}></div>
				</div>
			</div>
			</div>
		</div>
	)
}
