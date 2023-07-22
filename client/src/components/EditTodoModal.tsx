import { FC, useState } from 'react';
import { TodoList } from '../App';

interface EditTodoProps {
  todoItem: string;
  todoId: number;
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
  todoList: TodoList[];
}

const EditTodoModal: FC<EditTodoProps> = ({
  todoItem,
  todoId,
  setTodoList,
  todoList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInput, setNewInput] = useState(todoItem);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancelAndClose = () => {
    setNewInput(todoItem);
    setIsModalOpen(false);
  };

  const handleSaveEdit = async (id: number, text: string) => {
    console.log('saving the edit...');
    console.log(id, text);
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ description: text }),
    });

    const tempTodoList = [...todoList];
    const tempTodo = tempTodoList.find((todo) => todo.todo_id === id);
    if (!tempTodo) return;
    tempTodo.description = text;
    setTodoList(tempTodoList);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className='border border-gray-400 rounded-lg px-4 shadow-xs'
        onClick={handleEdit}
      >
        Edit
      </button>
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm'>
          {/* backdrop-blur-sm creates Blurred background */}
          <div className='bg-gray-200 px-4 shadow-md w-[400px] h-[200px] flex flex-col justify-between'>
            {/* Title and X button */}
            <div className='flex items-center justify-between py-2 pt-3 border-b-2 border-b-gray-400'>
              <h1 className='text-xl font-semibold'>Editing Todo </h1>
              <div
                onClick={handleCancelAndClose}
                className='cursor-pointer text-2xl font-semibold'
              >
                x
              </div>
            </div>
            {/* Input  */}
            <div>
              <input
                type='text'
                defaultValue={newInput}
                className='border border-gray-400 focus:outline-none w-full py-2 px-4 rounded-lg'
                onChange={(e) => setNewInput(e.target.value)}
              />
            </div>

            {/* Save and Cancel buttons */}
            <div className='mt-2 pb-4 flex justify-end gap-4'>
              <button
                className='border border-gray-400 rounded-lg px-4 shadow-md'
                onClick={() => handleSaveEdit(todoId, newInput)}
              >
                Save
              </button>
              <button
                className='border border-gray-400 rounded-lg px-4 py-1 shadow-md'
                onClick={handleCancelAndClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodoModal;
