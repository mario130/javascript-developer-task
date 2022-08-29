import {useDispatch, useSelector} from 'react-redux';
import {nextQuestion} from "../app/practiceSlice";
import {RootState} from '../app/store';

export type RatingProps = {
    currentQuestion?: number
}

export default function Rating() {
    const dispatch = useDispatch();

    const currentQuestion = useSelector((state: RootState) => state.practice.currentQuestion);

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
            <h1 className='text-2xl font-semibold my-4'>Which part of speech does this word belong?</h1>
            <p className='text-true-gray-400 text-center py-4'>Cycling</p>
            {/* choice buttons */}
            <div className='flex flex-wrap pt-6 justify-center'>
                {
                    Array.from({length: 4}, (_, i) => i + 1).map(el =>
                        <div className={''}>
                            <button
                                key={el}
                                onClick={onChangeRating}
                                value={el}
                                className={
                                    `${currentQuestion === el
                                        ? 'bg-primary text-white'
                                        : 'bg-white hover:bg-gray-500 text-black'}
                                    active:bg-primary active:text-white transition-all  p-2 `
                                }
                            >{`Answer ${el}`}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
