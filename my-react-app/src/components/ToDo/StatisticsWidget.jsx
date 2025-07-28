// Statistics widget component that displays todo completion metrics
// Shows a pie chart visualization of completed vs pending tasks
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { STATUS_COLORS } from '../../constants';
import { CHART_CONFIG } from '../../constants';

const StatisticsWidget = ({ todos }) => {
  // Don't render if no todos are available
  if (!todos || todos.length === 0) {
    return null;
  }

  // Calculate completion statistics
  const completedCount = todos.filter(
    (t) => t.state === 'STATE_COMPLETED'
  ).length;
  const totalCount = todos.length;
  const completedPercentage = Math.round((completedCount / totalCount) * 100);

  // Prepare data for the pie chart
  const chartData = [
    {
      title: 'Completed',
      value: completedCount,
      color: STATUS_COLORS.COMPLETED,
    },
    {
      title: 'Pending',
      value: totalCount - completedCount,
      color: STATUS_COLORS.PENDING,
    },
  ];

  return (
    <div className='stats-widget'>
      {/* Widget title */}
      <h3 className='stats-title'>Tasks Overview</h3>
      <div className='stats-content'>
        {/* Pie chart container with centered percentage */}
        <div className='pie-chart-container'>
          <PieChart
            data={chartData}
            lineWidth={CHART_CONFIG.PIE_CHART_LINE_WIDTH}
            animate
          />

          {/* Center label showing completion percentage */}
          <div className='chart-center-label'>
            <strong>{`${completedPercentage}%`}</strong>
            <span>Done</span>
          </div>
        </div>
        {/* Legend showing task counts by status */}
        <div className='stats-legend'>
          <div className='legend-item'>
            <span className='legend-color-box completed'></span>
            Completed: <strong>{completedCount}</strong>
          </div>
          <div className='legend-item'>
            <span className='legend-color-box pending'></span>
            Pending: <strong>{totalCount - completedCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsWidget;
