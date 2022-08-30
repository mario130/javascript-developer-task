import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Rank() {
	const currentQuestionIdx: number = useSelector((state: RootState) => state.practice.currentQuestionIdx);
	const rank: number | null = useSelector((state: RootState) => state.practice.rank);
	const navigate = useNavigate();

	useEffect(()=> {
		// In case of direct visit to this page go to the homepage
		if (!currentQuestionIdx) navigate('/')
	}, [])
	

	return (
		<div className='m-auto'>
			<div className='mx-4 bg-secondary rounded-2xl p-6 max-w-sm text-white shadow-2xl'>
				<div className='rounded-3xl w-fit'>
					<img
						width="40"
						src="/nagwa.png"
						alt="star icon"
					/>
				</div>
				<h1 className='text-2xl font-semibold my-4'>{rank! >= 70 ? "Excellent" : rank! >= 50 ? 'Good job' : 'Try harder'}, You've beaten {rank}% of your peers!</h1>
				<Link to={'/'}><button className="px-6 py-2 mt-4 w-full bg-pink-500 text-white m-auto rounded-lg">Try again</button></Link>
			</div>
		</div>
	)
}
