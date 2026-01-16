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

const TodoHeader = () => {
  const { tasks } = useTodoStore();

  return (
    <Header>

      {tasks.length >= 1 && <>{tasks.length} tasks total</>}
    </Header>
  );
}

export default TodoHeader;