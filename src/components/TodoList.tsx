import { useState } from 'react';
import styled from 'styled-components';
import useTodoStore from '../store/useTodoStore';
import { Input, List, ListItem, Section, Button } from './ui';
import { Check, Edit01, Trash01, XClose } from "@untitledui/icons";
import type { Task } from '../types/Todo';

const TaskText = styled.span<{ $completed: boolean }>`
  text-decoration: ${props => props.$completed ? "line-through" : "none"};
  opacity: ${props => props.$completed ? 0.5 : 1};
`;

export const ThumbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 9C7.55228 9 8 9.44772 8 10V22C8 22.5523 7.55228 23 7 23C6.44772 23 6 22.5523 6 22V10C6 9.44772 6.44772 9 7 9Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1058 1.55227C11.2773 1.20978 11.6294 0.995334 12.0124 1.00008C12.6346 1.00778 13.2471 1.156 13.804 1.43366C14.3609 1.71131 14.8479 2.11123 15.2285 2.60352C15.6092 3.09582 15.8736 3.66777 16.0022 4.27663C16.1306 4.88478 16.12 5.51406 15.9714 6.11756L15.2718 9H19.83C20.2957 9 20.7551 9.10844 21.1716 9.31672C21.5882 9.525 21.9506 9.82741 22.23 10.2C22.5094 10.5726 22.6983 11.0051 22.7816 11.4633C22.8649 11.9214 22.8404 12.3926 22.7101 12.8396L20.38 20.84C20.1982 21.4631 19.8193 22.0105 19.3 22.4C18.7807 22.7895 18.1491 23 17.5 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7956 1 20V12C1 11.2044 1.31607 10.4413 1.87868 9.87868C2.44129 9.31607 3.20435 9 4 9H6.75947C7.31866 8.9997 7.86563 8.8437 8.33996 8.5496L11.1058 1.55227Z"
      fill="#fff"
    />
  </svg>
);

const Checkbox = styled.button<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--text-color);
  background: ${props => props.$checked ? 'var(--btn-bg)' : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  transition: all 0.2s;

  svg {
    width: 14px;
    height: 14px;
    color: var(--btn-text);
    opacity: ${props => props.$checked ? 1 : 0};
  }

  &:hover {
    border-color: var(--btn-bg);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    width: 100%;
    padding: 16px;
  }
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
  display: none;
  position: absolute;
  right: 16px;
  top: 0;
  height: 100%;

  ${ListItem}:hover & {
    display: flex;
  }
`;

const TodoItem = ({ task }: { task: Task }) => {
  const { toggleTask, removeTask, updateTaskText } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleSave = () => {
    const newText = editValue.trim();
    if (newText) {
      updateTaskText(task.id, newText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(task.text);
    setIsEditing(false);
  };

  const handleRowClick = () => {
    if (!isEditing) {
      toggleTask(task.id);
    }
  };

  return (
    <ListItem>
      <CheckboxContainer onClick={handleRowClick}>
        <Checkbox $checked={task.completed}>
          <Check />
        </Checkbox>
        <label>
          {isEditing ? (
            <Input
              $variant="ghost"
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Escape") handleCancel();
                if (e.key === "Enter") handleSave();
              }}
            />
          ) : (
            <TaskText $completed={task.completed}>
              {task.text}
            </TaskText>
          )}
        </label>
      </CheckboxContainer>
      <Actions>
        {!isEditing ? (
          <>
            <Button $variant="ghost" $size="icon" onClick={() => setIsEditing(true)}>
              <Edit01 />
            </Button>
            <Button $variant="ghost" $size="icon" onClick={() => removeTask(task.id)}>
              <Trash01 />
            </Button>
          </>
        ) : (
          <>
            <Button $variant="ghost" $size="icon" onClick={handleSave}>
              <Check />
            </Button>
            <Button $variant="ghost" $size="icon" onClick={handleCancel}>
              <XClose />
            </Button>
          </>
        )}
      </Actions>
    </ListItem>
  );
};

const TodoList = () => {
  const { tasks } = useTodoStore();

  return (
    <Section aria-labelledby="todo-list">
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => <TodoItem key={task.id} task={task} />)
        ) : (
          <p style={{ margin: 'auto auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <ThumbIcon style={{ width: '48px', height: '48px', marginBottom: '16px' }} />
            Add a task to get busy!
          </p>
        )}
      </List>
    </Section>
  );
};

export default TodoList;
