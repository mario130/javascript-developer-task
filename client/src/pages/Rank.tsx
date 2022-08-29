import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

export default function Rank() {
	const rank: number | null = useSelector((state: RootState) => state.practice.rank);
	const navigate = useNavigate();

	if (!rank) navigate('/')
	console.log(rank);
	

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
				<h1 className='text-2xl font-semibold my-4'>You've beaten {rank}% of your peers</h1>
			</div>
		</div>
	)
}
