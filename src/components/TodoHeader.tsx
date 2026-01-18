import styled from 'styled-components';
import useTodoStore from '../store/useTodoStore';

const Header = styled.header`
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;
  background-color: rgba(18, 18, 18, 0.7);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
`;

const TaskCount = styled.span`
  font-size: 0.9rem;
`;

const TodoHeader = () => {
  const { tasks } = useTodoStore();
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <Header role="banner">
      <h1 className="visually-hidden">Todo Application</h1>
      {totalCount >= 1 && (
        <TaskCount aria-live="polite" aria-atomic="true">
          {completedCount} of {totalCount} tasks completed
        </TaskCount>
      )}
    </Header>
  );
}

export default TodoHeader;
