import { FC, useState } from 'react';
import Input from '../components/Input';
import ListTodos from '../components/ListTodos';

export type TodoList = {
  todo_id: number;
  description: string;
  email: string;
  create_date: string;
  isFinished: boolean;
};

interface TodoAppProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoApp: FC<TodoAppProps> = ({ setIsAuthenticated }) => {
  const [todoList, setTodoList] = useState<TodoList[]>([]);

  return (
    <div className='max-w-6xl mx-auto h-screen'>
      <div className='flex flex-col items-center justify-center mt-12'>
        <Input setTodoList={setTodoList} />
        <ListTodos todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
};

export default TodoApp;
