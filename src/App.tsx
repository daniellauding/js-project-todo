import { TodoForm } from './components/TodoForm';

export const App = () => {
  // This function will be called when a todo is added
  const handleAddTodo = (text: string) => {
    console.log('New todo:', text); // For now, just log it
  };

  return (
    <div>
      <h1>Todo App by Daniel</h1>
      <TodoForm onAddTodo={handleAddTodo} />
    </div>
  );
};
