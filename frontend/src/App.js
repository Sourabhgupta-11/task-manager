import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import { AuthProvider, AuthContext } from "./context/AuthContext.js";
import { TaskProvider, TaskContext } from "./context/TaskContext.js";

import Login from "./components/Login.js";
import TaskForm from "./components/TaskForm.js";
import ProgressTracker from "./components/ProgressTracker.js";
import Charts from "./components/Charts.js";
import TaskPage from "./pages/TaskPage.js";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { tasks, addTask } = useContext(TaskContext);

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h3>Welcome, {user.username}</h3>
        </Col>
        <Col className="text-end">
          <Button variant="danger" onClick={logout}>Logout</Button>
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

function AppContent() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
