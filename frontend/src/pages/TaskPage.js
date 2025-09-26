import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext.js";

const priorityColors = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

const categoryColors = {
  Work: "info",
  Personal: "secondary",
  Study: "primary",
  Urgent: "danger",
  General: "dark",
};

const TaskPage = () => {
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const [deadline, setDeadline] = useState("");

  const toggleComplete = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleShowModal = (task) => {
    setEditTask(task);
    setName(task.name || "");
    setPriority(task.priority);
    setCategory(task.category);
    setDeadline(task.deadline ? task.deadline.split("T")[0] : "");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveTask = () => {
    updateTask({
      ...editTask,
      name,
      priority,
      category,
      deadline,
    });
    setShowModal(false);
  };

  const sortedTasks = tasks.slice().sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📋 Your Tasks</h2>
        <Link to="/">
          <Button variant="primary">🏠 Go to Dashboard</Button>
        </Link>
      </div>

      <Row>
        {sortedTasks.length === 0 ? (
          <p className="text-center text-muted">No tasks found.</p>
        ) : (
          sortedTasks.map((task) => (
            <Col md={6} key={task._id} className="mb-3">
              <Card className="shadow-sm border-0 rounded-3">
                <Card.Body>
                  <h5 className="fw-bold">{task.name}</h5>

                  <span className={`badge bg-${priorityColors[task.priority]} me-2`}>
                    Priority: {task.priority}
                  </span>
                  <span className={`badge bg-${categoryColors[task.category]}`}>
                    Category: {task.category}
                  </span>

                  <p className="mt-2 text-danger fw-semibold">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </p>

                  <Button
                    variant={task.completed ? "success" : "outline-success"}
                    size="sm"
                    className="me-2"
                    onClick={() => toggleComplete(task)}
                  >
                    {task.completed ? "Completed" : "Mark Complete"}
                  </Button>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(task)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Work</option>
                <option>Personal</option>
                <option>Study</option>
                <option>Urgent</option>
                <option>General</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskPage;
