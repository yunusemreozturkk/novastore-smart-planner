import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium"); // ✅ state içinde hep küçük harf

  const submit = (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    // dueDate boşsa bugüne setlemek istersen açabilirsin:
    // const finalDate = dueDate || new Date().toISOString().slice(0, 10);

    onAddTask({
      title: cleanTitle,
      dueDate,
      priority, // ✅ low|medium|high
    });

    setTitle("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-500"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-indigo-500 sm:w-48"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-indigo-500 sm:w-40"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-[0.99] sm:w-28"
      >
        Add
      </button>
    </form>
  );
}