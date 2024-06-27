import React, { useEffect, useState } from 'react';
import { Table, Tag, Dropdown, Menu, Modal, Button } from 'antd';
import DetailTable from "./detail-table";
import { updateStatus } from 'src/api/order';
import { payment, checkPayment } from 'src/api/payment';

export default function OrderTable({ data, count, setCount }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [hoveredRecord, setHoveredRecord] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  useEffect(() => {
    data.map(async (item) => {
      if (item.status == 0 && item.apptransid != null) {
        const result = await checkPayment(item.apptransid);
        if(result.data.return_code == 1){
          const formData = {
            id: item.key,
            status: 3
          }
          await updateStatus(formData);
          setCount(count + 1);
        }
      }
    });
  },[data])

  const handleMenuClick = async (e) => {
    if(parseInt(e.key) === 1){
      setNewStatus(parseInt(e.key));
      setIsModalVisible(true);
    }else{
      await handlePayment();
      return;
    }
  };

  const handleStatusUpdate = async (record, newStatus) => {
    const formData = {
      id: record.key,
      status: newStatus,
    };
    hoveredRecord.status = newStatus;
    await updateStatus(formData);
    setIsModalVisible(false);
    setSelectedRecord(null);
    setHoveredRecord(null);
    setNewStatus(null);
  };

  const handlePayment = async () => {
    const number = Math.floor(Math.random() * (100000 - 1000 + 1));
    const formData = {
      "orderid": hoveredRecord.key,
      "transID": number,
    }
    const result = await payment(formData);
    if(result.data.return_code == 1){
      const paymentUrl = result.data.order_url;
      console.log(paymentUrl);
      window.location.href = paymentUrl;
    }
  }

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
      label: 'Thanh toán',
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
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdat',
      key: 'createdat',
    },
    {
      title: 'Trạng thái',
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
          case 3:
            color = 'yellow';
            text = 'Đã thanh toán';
            break;
          default:
            color = 'gray';
            text = 'Unknown';
        }

        return (
          <Tag color={color} key={tag}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
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
              >
                Cập nhật
              </a>
            </Dropdown>
          );
        }
        if(record.status === 3){
          return (
              <a
              onMouseEnter={() => {
                setHoveredRecord(record)
              }}
                onClick={() => handleStatusUpdate(record, 2)}
              >
                Đã nhận hàng
              </a>
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
        <p>Bạn có chắc muốn hủy đơn hàng này?</p>
      </Modal>
    </>
  );
}
