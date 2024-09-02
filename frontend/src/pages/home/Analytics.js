import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';
import { Table, Card, Row, Col } from 'antd';
import { RiseOutlined } from '@ant-design/icons';

// Sample data
const data = [
  { name: 'January', gains: 4000, loss: 2400, amt: 2400 },
  { name: 'February', gains: 3000, loss: 1398, amt: 2210 },
  { name: 'March', gains: 2000, loss: 9800, amt: 2290 },
  { name: 'April', gains: 2780, loss: 3908, amt: 2000 },
  { name: 'May', gains: 1890, loss: 4800, amt: 2181 },
  { name: 'June', gains: 2390, loss: 3800, amt: 2500 },
  { name: 'July', gains: 3490, loss: 4300, amt: 2100 },
  { name: 'August', gains: 3490, loss: 4300, amt: 2100 },
  { name: 'September', gains: 3490, loss: 4300, amt: 2100 },
  { name: 'October', gains: 3490, loss: 4300, amt: 2100 },
  { name: 'November', gains: 3490, loss: 4300, amt: 2100 },
  { name: 'December', gains: 3490, loss: 4300, amt: 2100 },
];

const ChartComponent = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <LineChartIcon size={24} style={{ marginRight: 8 }} />
        <h2>Total Trade </h2>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="gains" stroke="#82ca9d" />
          <Line type="monotone" dataKey="loss" stroke="#FF1616" />
        </LineChart>
      </ResponsiveContainer>

      <Row gutter={16} style={{ marginBottom: '10px' }}>
        <Col span={8}>
          <Card title="Average Monthly Gains " bordered={false}>
            <div><RiseOutlined /></div>
            {/* ${(summaryData.totalSpending / 12).toFixed(2)} */} 1,000,000
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Average Monthly Loss" bordered={false}>
            {/* ${(summaryData.totalIncome / 12).toFixed(2)} */} 2,000,000
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Average Monthly Savings" bordered={false}>
            {/* ${(summaryData.totalSavings / 12).toFixed(2)} */} 6,000,000
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartComponent;
