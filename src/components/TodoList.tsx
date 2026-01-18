import { useState } from 'react';
import styled from 'styled-components';
import useTodoStore from '../store/useTodoStore';
import { Input, List, ListItem, Section, Button } from './ui';
import { Check, Edit01, Trash01, XClose } from "@untitledui/icons";
import type { Task } from '../types/Todo';

const TaskText = styled.span<{ $completed: boolean }>`
  text-decoration: ${props => props.$completed ? "line-through" : "none"};
  color: ${props => props.$completed ? 'var(--text-muted)' : 'var(--text-color)'};
  flex: 1;
`;

const TaskMeta = styled.span`
  font-size: 0.65rem;
  color: var(--text-muted);
  white-space: nowrap;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ThumbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
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

  &:focus-visible {
    outline: 2px solid var(--btn-bg);
    outline-offset: 2px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
  position: absolute;
  right: 16px;
  top: 0;
  height: 100%;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${ListItem}:hover &,
  ${ListItem}:focus-within & {
    opacity: 1;
  }

  button:focus-visible {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
`;

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

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

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      toggleTask(task.id);
    }
  };

  const displayDate = task.updatedAt ? formatDate(task.updatedAt) : formatDate(task.createdAt);
  const dateLabel = task.updatedAt ? 'Updated' : 'Added';

  return (
    <ListItem>
      <CheckboxContainer>
        <Checkbox
          $checked={task.completed}
          onClick={handleToggle}
          role="checkbox"
          aria-checked={task.completed}
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        >
          <Check aria-hidden="true" />
        </Checkbox>
        {isEditing ? (
          <Input
            $variant="ghost"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            aria-label="Edit task text"
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
              if (e.key === "Enter") handleSave();
            }}
          />
        ) : (
          <Wrap>
            <TaskText $completed={task.completed}>
              {task.text}
            </TaskText>
            {displayDate && (
              <TaskMeta title={`${dateLabel}: ${new Date(task.updatedAt || task.createdAt).toLocaleString()}`}>
                {displayDate}
              </TaskMeta>
            )}
          </Wrap>
        )}
      </CheckboxContainer>
      <Actions>
        {!isEditing ? (
          <>
            <Button
              $variant="ghost"
              $size="icon"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit "${task.text}"`}
            >
              <Edit01 aria-hidden="true" />
            </Button>
            <Button
              $variant="ghost"
              $size="icon"
              onClick={() => removeTask(task.id)}
              aria-label={`Delete "${task.text}"`}
            >
              <Trash01 aria-hidden="true" />
            </Button>
          </>
        ) : (
          <>
            <Button
              $variant="ghost"
              $size="icon"
              onClick={handleSave}
              aria-label="Save changes"
            >
              <Check aria-hidden="true" />
            </Button>
            <Button
              $variant="ghost"
              $size="icon"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              <XClose aria-hidden="true" />
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
    <Section aria-labelledby="todo-list-heading">
      <h2 id="todo-list-heading" className="visually-hidden">Task list</h2>
      <List role="list" aria-label="Todo tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => <TodoItem key={task.id} task={task} />)
        ) : (
          <EmptyState role="status" aria-live="polite">
            <ThumbIcon style={{ width: '48px', height: '48px' }} />
            <p>Add a task to get busy!</p>
          </EmptyState>
        )}
      </List>
    </Section>
  );
};

export default TodoList;
