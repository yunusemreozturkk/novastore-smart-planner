import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import EditTaskModal from "./components/EditTaskModal";

const STORAGE_KEY = "novastore_tasks_v1";

const normPriority = (p) => String(p || "").trim().toLowerCase(); // "Low" -> "low"

export default function App() {
  // ✅ localStorage'dan başlangıç
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((t) => ({
        ...t,
        priority: normPriority(t.priority) || "medium",
        completed: Boolean(t.completed),
      }));
    } catch (e) {
      console.warn("Storage init read failed:", e);
      return [];
    }
  });

  // ✅ filter + sort state (mevcut davranış korunuyor)
  const [priorityFilter, setPriorityFilter] = useState("all"); // all|low|medium|high
  const [sortKey, setSortKey] = useState("newest"); // newest|oldest|due_asc|due_desc|title_asc
  const [hideCompleted, setHideCompleted] = useState(false);

  // ✅ edit modal state
  const [editingTask, setEditingTask] = useState(null);

  // ✅ tasks değiştikçe kaydet
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  }, [tasks]);

  const addTask = ({ title, dueDate, priority }) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      dueDate, // "YYYY-MM-DD"
      priority: normPriority(priority) || "medium",
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ update (modal save)
  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // ✅ filtre + sort (mevcut davranış korunuyor)
  const visibleTasks = useMemo(() => {
    let arr = [...tasks];

    if (hideCompleted) arr = arr.filter((t) => !t.completed);

    if (priorityFilter !== "all") {
      arr = arr.filter((t) => normPriority(t.priority) === priorityFilter);
    }

    arr.sort((a, b) => {
      if (sortKey === "newest") return (b.createdAt ?? 0) - (a.createdAt ?? 0);
      if (sortKey === "oldest") return (a.createdAt ?? 0) - (b.createdAt ?? 0);

      if (sortKey === "title_asc") {
        return String(a.title || "").localeCompare(String(b.title || ""), "tr");
      }

      const aDue = a.dueDate
        ? new Date(a.dueDate).getTime()
        : Number.POSITIVE_INFINITY;
      const bDue = b.dueDate
        ? new Date(b.dueDate).getTime()
        : Number.POSITIVE_INFINITY;

      if (sortKey === "due_asc") return aDue - bDue;
      if (sortKey === "due_desc") return bDue - aDue;

      return 0;
    });

    return arr;
  }, [tasks, priorityFilter, sortKey, hideCompleted]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Header />

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <TaskForm onAddTask={addTask} />
        </div>

        <div className="mt-4">
          <FilterBar
            priorityFilter={priorityFilter}
            onChangePriority={setPriorityFilter}
            sortKey={sortKey}
            onChangeSort={setSortKey}
            hideCompleted={hideCompleted}
            onToggleHideCompleted={() => setHideCompleted((v) => !v)}
            totalCount={tasks.length}
            shownCount={visibleTasks.length}
          />
        </div>

        <div className="mt-4">
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={(task) => setEditingTask(task)}
          />
        </div>

        {/* ✅ Edit Modal */}
        <EditTaskModal
          isOpen={Boolean(editingTask)}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updated) => {
            updateTask(updated);
            setEditingTask(null);
          }}
        />
      </div>
    </div>
  );
}