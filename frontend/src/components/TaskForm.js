import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Task Name</Form.Label>
        <Form.Control placeholder="Enter your task" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Urgent</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Priority</Form.Label>
        <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option><option>Medium</option><option>High</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary" className="w-100">Add Task</Button>
    </Form>
  );
}

export default TaskForm;
