import React from 'react';
import { Table, Tag, Space } from 'antd';

import DetailTable from "./detail-table";

export default function OrderTable({data}) {
  const columns = [
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Created At',
      dataIndex: 'createdat',
      key: 'createdat',
    },
    {
      title: 'Tags',
      key: 'status',
      dataIndex: 'status',
      render: (tag) => {
        let color;
        let text;

        switch (tag) {
          case 1:
            color = 'red';
            text = 'Đã hủy';
            break;
          case 0:
            color = 'blue';
            text = 'Đang giao hàng';
            break;
          case 2:
            color = 'green';
            text = 'Thành công';
            break;
        }

        return (
          <Tag color={color} key={tag}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Update</a>,
    },
  ];

  return (
    <Table
      columns={columns}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => {
          console.log('Expanded Record:', record); // Log the record to see its value
          return <DetailTable data={record.items} />;
        },
      }}
      dataSource={data}
    />
  );
}
