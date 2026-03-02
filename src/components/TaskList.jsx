import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-slate-300">
        No tasks yet. Add one above 👆
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}