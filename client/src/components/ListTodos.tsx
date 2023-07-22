import { FC, useEffect } from 'react';
import { TodoList } from '../pages/TodoApp';
import EditTodoModal from './EditTodoModal';

interface ListTodosProps {
  todoList: TodoList[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
}

const ListTodos: FC<ListTodosProps> = ({ todoList, setTodoList }) => {
  const retrieveTodos = async () => {
    console.log('I am retrieving...');
    const response = await fetch('http://localhost:3001/todos/');
    const data = await response.json();
    setTodoList(data);
  };

  useEffect(() => {
    console.log('retrieve todos');
    retrieveTodos();
  }, []);

  const handleDelete = async (id: number) => {
    console.log('I am deleting todo of id: ', id);
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    setTodoList(data);
    // I am retrieving todo list from server to get latest list
    // We also can use filter to delete the todo from the frontend as follows
    // setTodoList(todoList.filter(todo => todo.todo_id !== id));
    // which one is better?
  };
  return (
    <div className='mt-6 mx-4 sm:mx-0 sm:w-[600px] lg:w-[750px] border-0 border-zinc-100 rounded-md'>
      {todoList.length > 0 ? (
        todoList.reverse().map((todo) => (
          <div
            key={todo.todo_id}
            className='flex justify-between items-center border border-b-1 py-2 px-2 mb-2 rounded-md'
          >
            <div className='text-zinc-600 flex flex-wrap'>
              {todo.description}
            </div>
            <div className='flex gap-4 ml-6'>
              <EditTodoModal
                todoItem={todo.description}
                todoId={todo.todo_id}
                setTodoList={setTodoList}
                todoList={todoList}
              />
              <button
                className='border border-gray-400 rounded-md px-4 shadow-xs'
                onClick={() => handleDelete(todo.todo_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>You got nothing to do?</div>
      )}
    </div>
  );
};

export default ListTodos;
