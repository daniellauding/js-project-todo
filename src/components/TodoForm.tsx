import { useState } from 'react';
import styled from 'styled-components';
import useTodoStore from '../store/useTodoStore';

const TodoForm = () => {

  const { 
    addTask
  } = useTodoStore();

  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText("");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  // Styles here
`;

export default TodoForm;