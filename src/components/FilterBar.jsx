export default function FilterBar({
    priorityFilter,
    onChangePriority,
    sortKey,
    onChangeSort,
    hideCompleted,
    onToggleHideCompleted,
    totalCount = 0,
    shownCount = 0,
  }) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-300">
          Showing <span className="font-semibold text-slate-100">{shownCount}</span>{" "}
          of <span className="font-semibold text-slate-100">{totalCount}</span>{" "}
          tasks
        </div>
  
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* ✅ Completed toggle */}
          <button
            type="button"
            onClick={onToggleHideCompleted}
            className={`rounded-xl border px-3 py-2 text-sm outline-none transition
              ${
                hideCompleted
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-200"
                  : "border-slate-700 bg-slate-950/40 text-slate-200 hover:border-slate-600"
              }`}
          >
            {hideCompleted ? "Showing only active" : "Hide completed"}
          </button>
  
          {/* Priority (aynı) */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Priority:</span>
            <select
              className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              value={priorityFilter}
              onChange={(e) => onChangePriority(e.target.value)}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
  
          {/* Sort (aynı) */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort:</span>
            <select
              className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              value={sortKey}
              onChange={(e) => onChangeSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="due_asc">Due date (Soonest)</option>
              <option value="due_desc">Due date (Latest)</option>
              <option value="title_asc">Title (A → Z)</option>
            </select>
          </div>
        </div>
      </div>
    );
  }