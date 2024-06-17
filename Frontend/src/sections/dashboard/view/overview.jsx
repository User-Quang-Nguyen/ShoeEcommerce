import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Radio, Select } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { getDayOnMonth, getMonthonYear, getRevenueCanceled, getRevenueDaily, getRevenueMonth, getRevenuePending, getRevenueSuccess, getRevenueWeek } from 'src/api/revenue';

// --------------------------------------------------------------------------------

export default function Dashboard () {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // getMonth() returns 0-11
  const [timePeriod, setTimePeriod] = useState('month');
  const [daily, setDaily] = useState(0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);
  const [pending, setPending] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [success, setSuccess] = useState(0);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [count, setCount] = useState(0);
  // Sample data for different periods
  const generateMonthData = () => Array.from({ length: 30 }, (_, i) => ({ name: `Day ${i + 1}`, revenue: Math.floor(Math.random() * 5000) + 1000 }));

  const revenueData = {
    month: {
      '1': generateMonthData(),
      '2': generateMonthData(),
      '3': generateMonthData(),
      '4': generateMonthData(),
      '5': generateMonthData(),
      '6': generateMonthData(),
      '7': generateMonthData(),
      '8': generateMonthData(),
      '9': generateMonthData(),
      '10': generateMonthData(),
      '11': generateMonthData(),
      '12': generateMonthData(),
    },
    year: {
      '2022': [
        { name: 'Jan', revenue: 48000 },
        { name: 'Feb', revenue: 43000 },
        { name: 'Mar', revenue: 47000 },
        { name: 'Apr', revenue: 52000 },
        { name: 'May', revenue: 58000 },
        { name: 'Jun', revenue: 61000 },
        { name: 'Jul', revenue: 69000 },
        { name: 'Aug', revenue: 72000 },
        { name: 'Sep', revenue: 75000 },
        { name: 'Oct', revenue: 80000 },
        { name: 'Nov', revenue: 82000 },
        { name: 'Dec', revenue: 87000 },
      ],
      '2023': [
        { name: 'Jan', revenue: 50000 },
        { name: 'Feb', revenue: 45000 },
        { name: 'Mar', revenue: 48000 },
        { name: 'Apr', revenue: 53000 },
        { name: 'May', revenue: 59000 },
        { name: 'Jun', revenue: 62000 },
        { name: 'Jul', revenue: 70000 },
        { name: 'Aug', revenue: 73000 },
        { name: 'Sep', revenue: 76000 },
        { name: 'Oct', revenue: 81000 },
        { name: 'Nov', revenue: 83000 },
        { name: 'Dec', revenue: 88000 },
      ],
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const d = await getRevenueDaily();
      const w = await getRevenueWeek();
      const m = await getRevenueMonth();
      const p = await getRevenuePending();
      const c = await getRevenueCanceled();
      const s = await getRevenueSuccess();
      setDaily(d.data.daily_orders);
      setWeek(w.data.weekly_orders);
      setMonth(m.data.monthly_orders);
      setPending(p.data.pending_orders);
      setCanceled(c.data.canceled_orders);
      setSuccess(s.data.success_orders);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDayOnMonth(selectedYear, selectedMonth);
      setMonthData(response.data);
    };
    fetchData();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonthonYear(selectedYear);
      setYearData(response.data);
    };
    fetchData();
  }, [count, selectedYear]);

  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Orders Today" value={daily} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Orders This Week" value={week} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Orders This Month" value={month} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Orders" value={pending} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Canceled Orders" value={canceled} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Successful Orders" value={success} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title="Revenue Over Time"
            extra={
              <>
                <Select
                  defaultValue={selectedYear}
                  onChange={value => setSelectedYear(value)}
                  style={{ width: 120, marginRight: 16 }}
                >
                  <Option value="2022">2022</Option>
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                </Select>
                {timePeriod === 'month' && (
                  <Select
                    defaultValue={selectedMonth}
                    onChange={value => setSelectedMonth(value)}
                    style={{ width: 120, marginRight: 16 }}
                  >
                    {[...Array(12).keys()].map(i => (
                      <Option key={i + 1} value={i + 1}>{`Month ${i + 1}`}</Option>
                    ))}
                  </Select>
                )}
              </>
            }
          >
            <Radio.Group
              value={timePeriod}
              onChange={e => {
                setTimePeriod(e.target.value);
                setCount(count + 1);
              }}
              style={{ marginBottom: 16 }}
            >
              <Radio.Button value="month">Month</Radio.Button>
              <Radio.Button value="year">Year</Radio.Button>
            </Radio.Group>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={timePeriod === 'month' ? monthData : yearData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
