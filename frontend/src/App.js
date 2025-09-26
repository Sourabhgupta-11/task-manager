import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "./api/axios.js";

import { AuthProvider, AuthContext } from "./context/AuthContext.js";
import Login from "./components/Login.js";
import TaskForm from "./components/TaskForm.js";
import ProgressTracker from "./components/ProgressTracker.js";
import Charts from "./components/Charts.js";
import TaskPage from "./pages/TaskPage.js"; // separate page for tasks



//------------------------------------How Dashboard look like-----------------------------------------//

function Dashboard({ tasks, addTask }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h3>Welcome, {user.username}</h3>
        </Col>
        <Col className="text-end">
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <TaskForm addTask={addTask} />
          <Link to="/tasks">
            <Button className="mt-3 w-100" variant="primary">
              Show Tasks
            </Button>
          </Link>
        </Col>
        <Col md={8}>
          <ProgressTracker tasks={tasks} />
          <Charts tasks={tasks} />
        </Col>
      </Row>
    </Container>
  );
}

//--------------------------------------------------------------------------------------------------//

function AppContent() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // fetch tasks from backend
  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await api.get("/tasks");
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
      const res = await api.post("/tasks", task);
      setTasks([res.data, ...tasks]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };


//---------------------------------------TASK PAGE PART---------------------------------------------//

  const updateTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, task);
      setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <Routes>
      <Route path="/" element={<Dashboard tasks={tasks} addTask={addTask} />} />
      <Route
        path="/tasks"
        element={
          <TaskPage
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        }
      />
    </Routes>
  );
}


//-------------------------------------------------------------------------------------------------//

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
