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
      <Section $variant="form" aria-label="Add new task">
        {showForm ? (
          <StyledForm onSubmit={handleSubmit} id="todo-form">
            <label htmlFor="new-task-input" className="visually-hidden">
              New task
            </label>
            <Input
              id="new-task-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new task"
              autoFocus
              aria-describedby="task-hint"
            />
            <span id="task-hint" className="visually-hidden">
              Press Enter to add the task
            </span>
            <Button type="submit" disabled={text.length === 0} aria-label="Add task">
              <Check aria-hidden="true" />
            </Button>
          </StyledForm>
        ) : (
          <Fab>
            <Button
              $variant="add"
              onClick={() => setShowForm(true)}
              aria-expanded={showForm}
              aria-controls="todo-form"
              aria-label="Add new task"
            >
              <Plus aria-hidden="true" />
            </Button>
          </Fab>
        )}
      </Section>
    </>
  );
}

export default TodoForm;
