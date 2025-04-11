import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const renderCenterText = (label, totalAmount) => {
  return (
    <g>
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        fill="#666"
        fontSize="14"
      >
        {label}
      </text>
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fill="#333"
        fontSize="20"
        fontWeight="600"
      >
        {totalAmount}
      </text>
    </g>
  );
};

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {showTextAnchor && renderCenterText(label, totalAmount)}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
