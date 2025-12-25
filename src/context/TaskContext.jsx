import { createContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("filter", "all");
  const [mode, setMode] = useLocalStorage("theme", "light");

  const addTask = useCallback((text) => {
    setAllTasks([...allTasks, { id: uuid(), text, completed: false }]);
  }, [allTasks]);

  const toggleTask = useCallback((id) => {
    setAllTasks(
      allTasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, [allTasks]);

  const deleteTask = useCallback((id) => {
    setAllTasks(allTasks.filter(t => t.id !== id));
  }, [allTasks]);

  const visibleTasks = useMemo(() => {
    if (filter === "completed") return allTasks.filter(t => t.completed);
    if (filter === "pending") return allTasks.filter(t => !t.completed);
    return allTasks;
  }, [allTasks, filter]);

  return (
    <TaskContext.Provider
      value={{
        allTasks,
        visibleTasks,
        setAllTasks,
        addTask,
        toggleTask,
        deleteTask,
        filter,
        setFilter,
        mode,
        setMode,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
