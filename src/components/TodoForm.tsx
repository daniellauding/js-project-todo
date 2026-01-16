import { useState } from 'react';
import styled from 'styled-components';
import useTodoStore from '../store/useTodoStore';
import { Button, Input, Fab, Section } from './ui';
import { Check, Plus } from "@untitledui/icons";

const StyledForm = styled.form`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  input {
    width: 100%;
  }
`;

interface TodoFormProps {
  onClose?: () => void;
}

const TodoForm = ({ onClose }: TodoFormProps) => {
  const { addTask } = useTodoStore();
  const [text, setText] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText('');
    setShowForm(false);
  }

  return (
    <>
      <Section $variant="form" aria-labelledby="todo-heading">
        {showForm ? (
          <StyledForm onSubmit={handleSubmit}>
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new task"
              autoFocus
            />
            <Button type="submit" disabled={text.length === 0}>
              <Check />
            </Button>
          </StyledForm>
        ) : (
          <Fab>
            <Button $variant="add" onClick={() => setShowForm(true)} aria-expanded={showForm} aria-controls="todo-form">
              <Plus />
            </Button>
          </Fab>
        )}
      </Section>
    </>
  );
}

export default TodoForm;