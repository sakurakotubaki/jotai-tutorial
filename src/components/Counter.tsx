import { useAtom } from 'jotai';
import { counter } from '../atom/counter';
import './Counter.css';

export default function Counter() {
  const [count, setCounter] = useAtom<number>(counter);
  const onClick = (): void => setCounter(prev => prev + 1);
  return (
    <div className='countContainer'>
      <h1 className='countValue'>{count}</h1>
      <button className='countButton' onClick={onClick}>Click</button>
    </div>
  )
}