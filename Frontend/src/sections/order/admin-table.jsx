import React, { useState } from 'react';
import { Table, Tag, Dropdown, Menu, Modal, Button } from 'antd';
import DetailTable from "./detail-table";
import { updateStatus } from 'src/api/order';

export default function AdminOrderTable({ data }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [hoveredRecord, setHoveredRecord] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  const handleMenuClick = (e) => {
    setNewStatus(parseInt(e.key));
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (hoveredRecord && newStatus !== null) {
      const formData = {
        'id': hoveredRecord.key,
        'status': newStatus
      };
      hoveredRecord.status = newStatus;
      await updateStatus(formData);
    }
    setIsModalVisible(false);
    setSelectedRecord(null);
    setHoveredRecord(null);
    setNewStatus(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setHoveredRecord(null);
    setNewStatus(null);
  };

  const menuItems = [
    {
      label: 'Đã nhận được hàng',
      key: '2',
    },
    {
      label: 'Hủy đơn',
      key: '1',
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
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
          default:
            color = 'gray';
            text = 'Không xác định';
        }

        return (
          <Tag color={color} key={tag}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdat',
      key: 'createdat',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => {
        if (record.status === 0) {
          const menu = (
            <Menu onClick={handleMenuClick} items={menuItems} />
          );

          return (
            <Dropdown overlay={menu} trigger={['click']}>
              <a
                onMouseEnter={() => {
                  setHoveredRecord(record)
                }}
                // onMouseLeave={() => setHoveredRecord(null)}
              >
                Update
              </a>
            </Dropdown>
          );
        }
        return null;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => {
            return <DetailTable data={record.items} />;
          },
        }}
        dataSource={data}
      />
      <Modal
        title="Xác nhận cập nhật"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn cập nhật trạng thái đơn hàng này?</p>
      </Modal>
    </>
  );
}
