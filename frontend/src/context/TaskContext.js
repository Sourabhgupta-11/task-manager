import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios.js";
import { AuthContext } from "./AuthContext.js";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const sorted = res.data.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setTasks(sorted);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (task) => {
    try {
      const res = await api.post("/tasks", task, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, task, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
