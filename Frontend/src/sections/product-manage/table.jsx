import React, { useState } from 'react';
import { Table, Form, Input, Modal, Space, Button, InputNumber, Upload } from 'antd';
import DetailTable from "./detail-table";
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { addShoeDetail, updateShoeDetail, changeShoe } from 'src/api/products';

// ----------------------------------------------------------------------------------

export default function Management({ data, count, setCount }) {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [shoeid, setShoeid] = useState(0);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const handleAddShoeDetail = (record) => {
    setIsAddModalVisible(true);
    setShoeid(record.key);
    formAdd.resetFields();
  };

  const handleEditShoe = (record) => {
    setIsEditModalVisible(true);
    setShoeid(record.key);
    formEdit.setFieldsValue(record);
  };

  const handleAddFormSubmit = async (values) => {
    const formData = { shoeid, ...values };
    await addShoeDetail(formData); // Add API call
    setCount(count + 1);
    formAdd.resetFields();
    setIsAddModalVisible(false);
  };

  const handleEditFormSubmit = async (values) => {
    const formData = { shoeid, ...values };
    await changeShoe(formData);
    setCount(count + 1);
    formEdit.resetFields();
    setIsEditModalVisible(false);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    formAdd.resetFields();
    formEdit.resetFields();
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
        title="Add Shoe Detail"
        visible={isAddModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={formAdd}
          onFinish={handleAddFormSubmit}
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
      <Modal
        title="Edit Shoe"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={formEdit}
          onFinish={handleEditFormSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Brand" name="brandname">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input disabled />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
