import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const StatisticsWidget = ({ todos }) => {
  if (!todos || todos.length === 0) {
    return null;
  }

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  // Calculate the single percentage we want to display
  const completedPercentage = Math.round((completedCount / totalCount) * 100);

  const chartData = [
    { title: 'Completed', value: completedCount, color: '#10b981' },
    { title: 'Pending', value: totalCount - completedCount, color: '#f59e0b' },
  ];

  return (
    <div className="stats-widget">
      <h3 className="stats-title">Tasks Overview</h3>
      <div className="stats-content">
        <div className="pie-chart-container">
          <PieChart
            data={chartData}
            lineWidth={40} // Increased for better visual balance
            animate
            // We removed the 'label' props from here
          />
          {/* This is our new, custom center label */}
          <div className="chart-center-label">
            <strong>{`${completedPercentage}%`}</strong>
            <span>Done</span>
          </div>
        </div>
        <div className="stats-legend">
          <div className="legend-item">
            <span className="legend-color-box" style={{ backgroundColor: '#10b981' }}></span>
            Completed: <strong>{completedCount}</strong>
          </div>
          <div className="legend-item">
            <span className="legend-color-box" style={{ backgroundColor: '#f59e0b' }}></span>
            Pending: <strong>{totalCount - completedCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsWidget;