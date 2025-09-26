import React from "react";
import { ProgressBar, Card } from "react-bootstrap";

function ProgressTracker({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card className="p-3 mb-3">
      <h5>Progress Tracker</h5>
      <ProgressBar now={percent} label={`${percent}%`} />
      <p className="mt-2">{completed} of {total} tasks completed</p>
    </Card>
  );
}

export default ProgressTracker;
