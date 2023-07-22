import { Dispatch, FC, SetStateAction, useState } from 'react';
import { TodoList } from '../pages/TodoApp';

interface InputProps {
  setTodoList: Dispatch<SetStateAction<TodoList[]>>;
}

const Input: FC<InputProps> = ({ setTodoList }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/todos/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ description: input }),
      });
      const data = await res.json();
      setTodoList(data);
    } catch (error: unknown) {
      console.log((error as Error).message);
    }
    setInput('');
  };

  return (
    <div className='p-8 sm:w-[600px] '>
      <form className='flex gap-4' onSubmit={handleSubmit}>
        <input
          className='border border-gray-200 focus:outline-none w-full py-2 px-4 rounded-lg'
          type='text'
          placeholder='Add todo...'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
        />
        <button
          className='border border-gray-400 rounded-lg px-4 shadow-md disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none'
          disabled={input.trim() === ''}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
