import { useAtom } from 'jotai';
import { counter } from '../atom/counter';
import './Counter.css';

export default function ChildCounter() {
  const [count] = useAtom<number>(counter);
  
  return (
    <div className='countContainer'>
      <h1 className='countValue'>{count}</h1>
    </div>
  )
}