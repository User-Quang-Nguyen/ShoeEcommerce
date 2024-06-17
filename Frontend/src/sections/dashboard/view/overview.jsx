import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Radio, Select } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { getDayOnMonth, getMonthonYear, getRevenueCanceled, getRevenueDaily, getRevenueMonth, getRevenuePending, getRevenueSuccess, getRevenueWeek } from 'src/api/revenue';

// --------------------------------------------------------------------------------

export default function Dashboard () {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
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
            <Statistic title="Đơn hàng hôm nay" value={daily} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đơn đặt hàng trong tuần này" value={week} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đơn đặt hàng trong tháng này" value={month} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Đang chờ xử lý" value={pending} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Đã hủy" value={canceled} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Thành công" value={success} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title="Doanh thu theo thời gian"
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
                      <Option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</Option>
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
              <Radio.Button value="month">Tháng</Radio.Button>
              <Radio.Button value="year">Năm</Radio.Button>
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
