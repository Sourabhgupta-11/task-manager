import React, { useState } from "react";
import { Form, Button,Card } from "react-bootstrap";

function TaskForm({ addTask }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addTask({ name, category, priority, deadline, completed: false });
    setName(""); setCategory("General"); setPriority("Medium"); setDeadline("");
  };

  return (
    <Card className="p-4 shadow-lg rounded-4" style={{ backgroundColor: "#ffffffcc", backdropFilter: "blur(5px)" }}>
      <h3 className="fw-bold mb-4 text-center" style={{ color: "#00897b" }}>
        Add Your Task
      </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Task Name</Form.Label>
          <Form.Control
            placeholder="Enter your task"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>General</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Urgent</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Priority</Form.Label>
          <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Deadline</Form.Label>
          <Form.Control type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="w-100 fw-bold"
          style={{ background: "linear-gradient(90deg, #00bfa5, #00897b)", border: "none" }}
        >
          Add Task
        </Button>
      </Form>
    </Card>
  )
}
export default TaskForm;
