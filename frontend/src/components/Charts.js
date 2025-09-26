import React from "react";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Charts({ tasks }) {
  const today = new Date();

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0]; 
  });

  const countTasks = (priority, day) =>
    tasks.filter(
      (t) =>
        !t.completed &&
        t.priority === priority &&
        t.deadline &&
        new Date(t.deadline).toISOString().split("T")[0] === day
    ).length;

  const lowTasks = days.map((day) => countTasks("Low", day));
  const mediumTasks = days.map((day) => countTasks("Medium", day));
  const highTasks = days.map((day) => countTasks("High", day));

  const data = {
    labels: days,
    datasets: [
      {
        label: "Low Priority",
        data: lowTasks,
        backgroundColor: "rgba(75, 192, 192, 0.6)", 
      },
      {
        label: "Medium Priority",
        data: mediumTasks,
        backgroundColor: "rgba(255, 206, 86, 0.6)", 
      },
      {
        label: "High Priority",
        data: highTasks,
        backgroundColor: "rgba(255, 99, 132, 0.6)", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tasks by Priority (Next 7 Days)" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
        },
      },
    },
  };

  return (
    <Card className="p-3 mb-3">
      <h5>Weekly Priority Breakdown</h5>
      <Bar data={data} options={options} />
    </Card>
  );
}

export default Charts;
