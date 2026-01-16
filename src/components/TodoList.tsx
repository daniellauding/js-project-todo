import styled from 'styled-components';
import useTodoStore from '../store/useTodoStore';

const StyledForm = styled.form`
  // Styles here
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li`
  margin-top: 10px; // Baserat på CSS-exempel i källorna [9]
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TaskText = styled.span<{ $completed: boolean }>`
  text-decoration: ${props => props.$completed ? "line-through" : "none"};
`;

const TodoList = () => {

  const { 
    tasks,
    toggleTask, 
    removeTask, 
    editTask,
    cancelEdit, 
    updateTaskText 
  } = useTodoStore();

  return (
    <List>
      {tasks.map((task) => (
        <TodoItem key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                autoFocus
                onBlur={(e) => {
                  const newText = e.target.value.trim();
                  if (newText) {
                    updateTaskText(task.id, newText);
                  } else {
                    cancelEdit(task.id);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    cancelEdit(task.id);
                  } else if (e.key === "Enter") {
                    const newText = (e.target as HTMLInputElement).value.trim();
                    if (newText) {
                      updateTaskText(task.id, newText);
                    }
                  }
                }}
              />
            ) : (
              <TaskText $completed={task.completed}>
                {task.text}
              </TaskText>
            )}
          </label>
          {!task.isEditing ? (
            <>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </>
          ) : (
            <button onClick={() => cancelEdit(task.id)}>Cancel</button>
          )}
        </TodoItem >
      ))}
    </List>
  );
}

export default TodoList;