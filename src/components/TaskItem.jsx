export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const prettyPriority =
    task.priority?.[0]?.toUpperCase() + task.priority?.slice(1);

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 accent-indigo-500"
        />

        <div>
          <div className={task.completed ? "line-through text-slate-400" : ""}>
            {task.title}
          </div>
          <div className="mt-1 text-sm text-slate-400">
            {task.dueDate ? `Due: ${task.dueDate}` : "No due date"} •{" "}
            {prettyPriority || "Medium"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(task)}
          className="rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm hover:bg-slate-900"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-xl bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}