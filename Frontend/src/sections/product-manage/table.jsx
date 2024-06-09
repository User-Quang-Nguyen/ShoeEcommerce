import React, { useState } from 'react';
import { Table, Form, Input, Modal, Space, Button, InputNumber } from 'antd';
import DetailTable from "./detail-table";
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { addShoeDetail } from 'src/api/products';

// ----------------------------------------------------------------------------------

export default function Management({ data, count, setCount }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shoeid, setShoeid] = useState(0);
  const [form] = Form.useForm();

  const handleAddShoeDetail = (record) => {
    setIsModalVisible(true);
    setShoeid(record.key);
    form.resetFields();
  };

  const handleEditShoe = (record) => {
    console.log(record);
  }

  const handleFormSubmit = async (values) => {
    const formData = { shoeid, ...values };
    const result = await addShoeDetail(formData);
    setCount(count + 1);
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img
          src="assets/images/products/product_3.jpg"
          alt={record.name}
          style={{ width: '50px', height: '50px' }}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Brand',
      dataIndex: 'brandname',
      key: 'brandname',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Space>
          <IconButton>
            <Iconify icon="material-symbols:delete" />
          </IconButton>
          <IconButton onClick={() => handleEditShoe(record)}>
            <Iconify icon="material-symbols:edit" />
          </IconButton>
          <IconButton onClick={() => handleAddShoeDetail(record)}>
            <Iconify icon="material-symbols:add" />
          </IconButton>
        </Space>
      )
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => {
            return <DetailTable data={record.detail} count={count} setCount={setCount} />;
          },
        }}
        dataSource={data}
      />
      <Modal
        title="Add shoe detail"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please input the color!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Size" name="size" rules={[{ required: true, message: 'Please input the size!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
