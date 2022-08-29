import {useDispatch, useSelector} from 'react-redux';
import {fetchQuestions, nextQuestion} from "../app/practiceSlice";
import {RootState} from '../app/store';
import {useEffect} from "react";

export type RatingProps = {
    currentQuestionIdx?: number
}

export default function Rating() {
    const dispatch = useDispatch();

    useEffect(()=> {
        // @ts-ignore
        dispatch(fetchQuestions())
    }, [])

    const currentQuestionIdx = useSelector((state: RootState) => state.practice.currentQuestionIdx);
    const currentQuestion = useSelector((state: RootState) => state.practice.questions[currentQuestionIdx]);

    const posValues = ['adjective', 'adverb', 'noun',  'verb']
    function onChangeRating() {
        dispatch(nextQuestion(2));
    }

    return (
        <div className='m-auto bg-secondary rounded-2xl p-6 max-w-sm text-white'>
            <div className='rounded-3xl w-fit'>
                <img
                    width="40"
                    src="/nagwa.png"
                    alt="star icon"
                />
            </div>
            <h1 className='text-2xl font-semibold my-4'>Which part of speech does this word belong to?</h1>
            <p className='text-true-gray-400 text-center py-4'>{currentQuestion ? currentQuestion.word : ''}</p>
            {/* choice buttons */}
            <div className='flex flex-wrap pt-6 justify-between'>
                {
                    posValues.map(pos =>
                        <div className={''}>
                            <button
                                key={pos}
                                onClick={onChangeRating}
                                value={pos}
                                className={`
                                     hover:bg-gray-500 
                                    active:bg-primary active:text-white transition-all  p-2 `
                                }
                            >{`${pos}`}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
