import { useState } from 'react';
import { Title, todoList, tongleOpen } from './Atoms';
import { useRecoilState } from 'recoil';

type todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useRecoilState<todo[]>(todoList);
  const [isOpen, setIsOpen] = useRecoilState<boolean>(tongleOpen);
  const [title, setTitle] = useRecoilState<string>(Title);
  const [editId, setEditId] = useState<number>(0);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const completeTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditId(todo?.id || 0);
    setTitle(todo?.title || '');
    setIsOpen(!isOpen);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, title };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsOpen(!isOpen);
    setEditId(0);
    setTitle('');
  };

  const handleSubmit = () => {
    if (title == '') {
      return alert('Enter todo to add');
    }
    const randomId = Math.floor(Math.random() * 1000000);
    setTodos([
      ...todos,
      {
        id: randomId,
        title,
        completed: false,
      },
    ]);
    setTitle('');
    toggleOverlay();
  };

  return (
    <>
      <p className="text-center text-2xl m-4">Todo App</p>
      <div>
        <button
          onClick={toggleOverlay}
          className="m-3 bg-black w-10 h-10 rounded text-white font-bold py-2 px-4 "
        >
          +
        </button>
        {todos.map((todo: todo, index: number) => (
          <>
            <div
              key={index}
              className="flex justify-around border ml-3 rounded w-[90%]"
            >
              <div
                className={`${todo.completed ? 'line-through' : ''} ml-3 p-3 `}
              >
                {todo.title}
              </div>
              <div className="p-3 w-40">
                {!todo.completed ? (
                  <button onClick={() => completeTodo(todo.id)}>✔</button>
                ) : (
                  <button onClick={() => removeTodo(todo.id)}>❌</button>
                )}
                <button className="ml-5" onClick={() => editTodo(todo.id)}>
                  ✏
                </button>
              </div>
            </div>
          </>
        ))}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="bg-white p-8 rounded shadow-lg z-50">
              <h2
                className="text-lg font-semibold mb-4 text-right"
                onClick={updateTodo}
              >
                ❌
              </h2>
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="input-title"
                  className=" text-lg ml-0 m-5 font-semibold"
                >
                  Enter title
                </label>
                <input
                  id="input-title"
                  type="text"
                  className="border rounded px-3 py-2 w-full mb-4"
                  placeholder="Enter task..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {editId !== 0 ? (
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={updateTodo}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
