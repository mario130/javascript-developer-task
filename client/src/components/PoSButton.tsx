export function PoSButton(pos: string, onSelectAnswer: (ans: string) => void): JSX.Element {
	return <button
		key={pos}
		onClick={() => onSelectAnswer(pos)}
		value={pos}
		className={"hover:bg-gray-600 active:bg-primary active:text-white transition-all  p-2 mb-4 grow rounded-lg"}
	>{`${pos}`}
	</button>;
}
