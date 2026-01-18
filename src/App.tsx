import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";
import { Main } from './components/ui';

export const App = () => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Main id="main-content" tabIndex={-1}>
        <TodoHeader />
        <TodoList />
        <TodoForm />
      </Main>
    </>
  );
};