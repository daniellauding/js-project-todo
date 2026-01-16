# Zustand Todo App - Nybörjarövning

## Mål
Bygg en Todo-app där alla komponenter delar state via Zustand istället för props.

---

## Före du börjar

```bash
# Skapa en ny branch att öva på
git checkout -b zustand-practice

# Installera zustand om det inte finns
npm install zustand
```

---

## Vad är Zustand? (Enkelt förklarat)

```
UTAN ZUSTAND (props):              MED ZUSTAND (store):
─────────────────────              ─────────────────────

     👩 App                              🧊 Store
       │                                    │
    ┌──┴──┐                          ┌──────┼──────┐
    ▼     ▼                          ▼      ▼      ▼
  Form   List                      Form   List   Header

  Barnen måste fråga               Alla kan öppna
  föräldern om allt!               skåpet själva!
```

---

## Steg-för-steg guide

### STEG 1: Skapa typen för en Task

**Fil:** `src/types/Todo.ts`

```typescript
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}
```

**Förklaring:**
- `id` - unikt nummer för varje task
- `text` - vad tasken säger
- `completed` - är den klar eller inte?
- `isEditing?` - redigerar vi just nu? (? = valfri)

---

### STEG 2: Skapa Zustand Store

**Fil:** `src/store/useTodoStore.ts`

Börja med grundstrukturen:

```typescript
import { create } from "zustand";
import type { Task } from "../types/Todo";

// 1. Beskriv VAD som finns i storen
interface TodoState {
  // Data
  tasks: Task[];

  // Funktioner
  addTask: (text: string) => void;
  // ... fler funktioner
}

// 2. Skapa storen
const useTodoStore = create<TodoState>((set) => ({
  // Startvärde
  tasks: [],

  // Funktioner som ändrar state
  addTask: (text) => set((state) => ({
    // ... din kod här
  })),
}));

export default useTodoStore;
```

---

### STEG 3: Fyll i store-funktionerna

**Hints för varje funktion:**

#### addTask - Lägg till ny task
```
Vad ska hända?
1. Ta emot text
2. Skapa ett nytt task-objekt med id, text, completed: false
3. Lägg till i tasks-arrayen

Hint: [...state.tasks, nyTask]
```

#### removeTask - Ta bort task
```
Vad ska hända?
1. Ta emot id
2. Filtrera bort tasken med det id:t

Hint: state.tasks.filter(task => ???)
```

#### toggleTask - Markera klar/inte klar
```
Vad ska hända?
1. Ta emot id
2. Hitta rätt task
3. Ändra completed till motsatsen

Hint: state.tasks.map(task =>
  task.id === id ? { ...task, completed: ??? } : task
)
```

---

### STEG 4: Skapa TodoForm

**Fil:** `src/components/TodoForm.tsx`

```typescript
import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';

const TodoForm = () => {
  // 1. Hämta addTask från storen
  const { addTask } = useTodoStore();

  // 2. Lokal state för input-fältet
  const [text, setText] = useState('');

  // 3. Hantera submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Använd store-funktionen!
    addTask(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Lägg till task..."
      />
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default TodoForm;
```

---

### STEG 5: Skapa TodoList

**Fil:** `src/components/TodoList.tsx`

```typescript
import useTodoStore from '../store/useTodoStore';

const TodoList = () => {
  // Hämta ALLT du behöver från storen
  const { tasks, toggleTask, removeTask } = useTodoStore();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span style={{
            textDecoration: task.completed ? 'line-through' : 'none'
          }}>
            {task.text}
          </span>
          <button onClick={() => removeTask(task.id)}>
            Ta bort
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

---

### STEG 6: Koppla ihop i App

**Fil:** `src/App.tsx`

```typescript
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div>
      <h1>Min Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;
```

**Notera:** App behöver INGEN useState och skickar INGA props!

---

## Checklista

- [ ] Task-typen skapad
- [ ] Store skapad med tasks-array
- [ ] addTask fungerar
- [ ] removeTask fungerar
- [ ] toggleTask fungerar (checkbox + line-through)
- [ ] TodoForm använder useTodoStore
- [ ] TodoList använder useTodoStore
- [ ] App.tsx är ren (inga props, ingen useState)

---

## Bonusutmaningar

När grunderna fungerar, lägg till:

1. **editTask** - Sätt `isEditing: true` på en task
2. **cancelEdit** - Sätt `isEditing: false`
3. **updateTaskText** - Spara ny text och sätt `isEditing: false`

---

## Stretch Goals

### Nivå 1: Enkla förbättringar

#### 1.1 Räkna tasks
```
┌─────────────────────────────────┐
│  Visa: "3 tasks (1 klar)"       │
└─────────────────────────────────┘
```

**Hint:** Skapa en ny komponent `TodoStats.tsx`
```typescript
const TodoStats = () => {
  const { tasks } = useTodoStore();

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  return <p>{total} tasks ({completed} klara)</p>;
};
```

#### 1.2 Rensa klara tasks
```
┌─────────────────────────────────┐
│  [Rensa alla klara]  ← knapp   │
└─────────────────────────────────┘
```

**Lägg till i storen:**
```typescript
clearCompleted: () => set((state) => ({
  tasks: state.tasks.filter(task => !task.completed)
}))
```

#### 1.3 Markera alla som klara
```
┌─────────────────────────────────┐
│  [✓ Markera alla]              │
└─────────────────────────────────┘
```

**Hint:** Använd `.map()` och sätt `completed: true` på alla

---

### Nivå 2: Filtrera efter datum

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   [ Today ]  [ Upcoming ]  [ Someday ]  [ All ]        │
│       ▲                                                 │
│       └── Aktiv filter                                  │
│                                                         │
│   ┌─────────────────────────────────────────────┐      │
│   │ ☐ Köpa mjölk              📅 Idag           │      │
│   │ ☐ Städa                   📅 Imorgon        │      │
│   │ ☐ Lära mig Zustand        📅 Someday        │      │
│   └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Steg 1: Uppdatera Task-typen

```typescript
// src/types/Todo.ts

export type DateCategory = 'today' | 'upcoming' | 'someday';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  isEditing?: boolean;

  // NYA FÄLT:
  dueDate?: Date;           // Specifikt datum (valfritt)
  dateCategory: DateCategory; // today / upcoming / someday
}
```

#### Steg 2: Lägg till filter i storen

```typescript
// src/store/useTodoStore.ts

interface TodoState {
  tasks: Task[];
  filter: DateCategory | 'all';  // NYA FÄLT

  // ... befintliga funktioner

  setFilter: (filter: DateCategory | 'all') => void;  // NY FUNKTION
}

const useTodoStore = create<TodoState>((set) => ({
  tasks: [],
  filter: 'all',  // Startvärde

  setFilter: (filter) => set({ filter }),

  // Uppdatera addTask:
  addTask: (text, dateCategory = 'today') => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        id: Date.now().toString(),
        text,
        completed: false,
        dateCategory,  // NY
      }
    ]
  })),
}));
```

#### Steg 3: Skapa FilterButtons komponent

```typescript
// src/components/FilterButtons.tsx

import useTodoStore from '../store/useTodoStore';

const FilterButtons = () => {
  const { filter, setFilter } = useTodoStore();

  const buttons = [
    { value: 'today', label: '📅 Today' },
    { value: 'upcoming', label: '📆 Upcoming' },
    { value: 'someday', label: '💭 Someday' },
    { value: 'all', label: '📋 All' },
  ];

  return (
    <div>
      {buttons.map(btn => (
        <button
          key={btn.value}
          onClick={() => setFilter(btn.value)}
          style={{
            fontWeight: filter === btn.value ? 'bold' : 'normal'
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
```

#### Steg 4: Filtrera i TodoList

```typescript
// I TodoList.tsx

const { tasks, filter, toggleTask, removeTask } = useTodoStore();

// Filtrera tasks baserat på valt filter
const filteredTasks = filter === 'all'
  ? tasks
  : tasks.filter(task => task.dateCategory === filter);

// Använd filteredTasks i din .map()
return (
  <ul>
    {filteredTasks.map((task) => (
      // ...
    ))}
  </ul>
);
```

#### Steg 5: Lägg till datumväljare i TodoForm

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  [________________] ← Input för text               │
│                                                     │
│  När ska detta göras?                              │
│  ( ) Today  ( ) Upcoming  ( ) Someday              │
│                                                     │
│  [Lägg till]                                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Hint:** Använd radio buttons eller en dropdown

---

### Nivå 3: Projekt / Klient

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  PROJEKT                         TASKS                  │
│  ┌───────────────┐              ┌───────────────────┐  │
│  │ 🏠 Hemma      │  ───────────▶│ ☐ Städa          │  │
│  │ 💼 Jobb       │              │ ☐ Handla         │  │
│  │ 👤 Klient A   │              └───────────────────┘  │
│  │ 👤 Klient B   │                                     │
│  │ + Nytt projekt│                                     │
│  └───────────────┘                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Steg 1: Skapa Project-typ

```typescript
// src/types/Todo.ts

export interface Project {
  id: string;
  name: string;
  color?: string;  // Valfri färg
}

export interface Task {
  // ... befintliga fält
  projectId?: string;  // NYA FÄLT - vilken projekt tillhör tasken?
}
```

#### Steg 2: Lägg till projects i storen

```typescript
interface TodoState {
  tasks: Task[];
  projects: Project[];           // NY DATA
  selectedProject: string | null; // NY - vilket projekt är valt?

  addProject: (name: string) => void;
  selectProject: (id: string | null) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  tasks: [],
  projects: [
    { id: 'inbox', name: '📥 Inbox' },  // Default projekt
  ],
  selectedProject: null,

  addProject: (name) => set((state) => ({
    projects: [
      ...state.projects,
      { id: Date.now().toString(), name }
    ]
  })),

  selectProject: (id) => set({ selectedProject: id }),

  // Uppdatera addTask att inkludera projectId
  addTask: (text, projectId) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        id: Date.now().toString(),
        text,
        completed: false,
        projectId: projectId || state.selectedProject || 'inbox',
      }
    ]
  })),
}));
```

#### Steg 3: Skapa ProjectList komponent

```typescript
// src/components/ProjectList.tsx

import useTodoStore from '../store/useTodoStore';

const ProjectList = () => {
  const { projects, selectedProject, selectProject } = useTodoStore();

  return (
    <aside>
      <h3>Projekt</h3>
      <ul>
        <li
          onClick={() => selectProject(null)}
          style={{ fontWeight: !selectedProject ? 'bold' : 'normal' }}
        >
          📋 Alla
        </li>
        {projects.map(project => (
          <li
            key={project.id}
            onClick={() => selectProject(project.id)}
            style={{
              fontWeight: selectedProject === project.id ? 'bold' : 'normal'
            }}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
```

#### Steg 4: Filtrera tasks efter projekt

```typescript
// I TodoList.tsx

const { tasks, selectedProject } = useTodoStore();

const filteredTasks = selectedProject
  ? tasks.filter(task => task.projectId === selectedProject)
  : tasks;
```

---

## Stretch Checklista

### Nivå 1 - Enkla
- [ ] Räkna tasks (total och klara)
- [ ] Knapp för att rensa klara
- [ ] Knapp för att markera alla klara

### Nivå 2 - Datumfilter
- [ ] Task-typ har `dateCategory`
- [ ] Store har `filter` state
- [ ] FilterButtons komponent
- [ ] TodoList filtrerar baserat på valt filter
- [ ] TodoForm låter välja datum-kategori

### Nivå 3 - Projekt
- [ ] Project-typ skapad
- [ ] Store har `projects` array
- [ ] Store har `selectedProject`
- [ ] ProjectList komponent (sidebar)
- [ ] TodoList filtrerar efter projekt
- [ ] TodoForm kopplar task till projekt

---

## Tips för Stretch Goals

```
BÖRJA ENKELT!

Nivå 1 ──────▶ Nivå 2 ──────▶ Nivå 3
  │              │              │
  ▼              ▼              ▼
Räknare       Datum          Projekt
  +            filter           +
Rensa-         +             Sidebar
knapp        Kategori-
             väljare

Ta en nivå i taget. Testa ofta!
```

---

## Vanliga fel

### "Tasks försvinner när jag klickar"
- Kolla att du returnerar rätt från store-funktionen
- Glöm inte `...state.tasks` när du lägger till

### "Checkbox funkar inte"
- Kolla att du skickar `task.id` till `toggleTask`
- Kolla att `toggleTask` flippar `completed` rätt

### "Line-through syns inte"
- Kolla att du använder `task.completed` i style
- Kolla stavningen: `textDecoration`, `line-through`

---

## Mönstret att komma ihåg

```
1. SKAPA STORE
   const useMyStore = create((set) => ({
     data: [],
     action: () => set((state) => ({ ... }))
   }))

2. ANVÄND I KOMPONENT
   const { data, action } = useMyStore();

3. KLAR!
   Ingen prop-drilling behövs.
```

---

Lycka till! Du klarar detta!
