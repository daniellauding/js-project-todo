import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";
import { Main } from './components/ui';

export const App = () => {
  return (
    <>
      <Main>
        <TodoHeader />
        <TodoList />
        <TodoForm />
      </Main>
    </>
  );
};