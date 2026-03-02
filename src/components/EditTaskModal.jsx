export default function EditTaskModal({ isOpen, task, onClose, onSave }) {
    if (!isOpen || !task) return null;
  
    const stop = (e) => e.stopPropagation();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const form = new FormData(e.currentTarget);
      const title = String(form.get("title") || "").trim();
      const dueDate = String(form.get("dueDate") || "");
      const priority = String(form.get("priority") || "medium").toLowerCase();
  
      if (!title) return;
  
      onSave({
        ...task,
        title,
        dueDate,
        priority,
      });
    };
  
    return (
      <div
        className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-2xl"
          onClick={stop}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Edit task</h2>
              <p className="mt-1 text-sm text-slate-400">
                Update title, due date, and priority.
              </p>
            </div>
  
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm hover:bg-slate-900"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="text-sm text-slate-300">Title</label>
              <input
                name="title"
                defaultValue={task.title}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Task title..."
              />
            </div>
  
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300">Due date</label>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={task.dueDate || ""}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>
  
              <div>
                <label className="text-sm text-slate-300">Priority</label>
                <select
                  name="priority"
                  defaultValue={task.priority || "medium"}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
  
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-2 text-sm hover:bg-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }