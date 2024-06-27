import React, { useState } from 'react';
import { Table, Form, Input, Modal, Space, Button, InputNumber, Upload, Tag } from 'antd';
import DetailTable from "./detail-table";
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { addShoeDetail, updateShoeDetail, changeShoe, deleteShoe } from 'src/api/products';

// ----------------------------------------------------------------------------------

export default function Management({ data, count, setCount }) {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [shoeid, setShoeid] = useState(0);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const handleAddShoeDetail = (record) => {
    setIsAddModalVisible(true);
    setShoeid(record.key);
    formAdd.resetFields();
  };

  const handleDeleteShoe = async () => {
    await deleteShoe(shoeid);
    setCount(count + 1);
    setIsDeleteModalVisible(false);
  }

  const showDeleteConfirm = (record) => {
    setShoeid(record.key);
    setIsDeleteModalVisible(true);
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
    setIsDeleteModalVisible(false);
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình ảnh',
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
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brandname',
      key: 'brandname',
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Trạng thái',
      key: 'isdeleted',
      dataIndex: 'isdeleted',
      render: (tag) => {
        let color;
        let text;

        switch (tag) {
          case true:
            color = 'red';
            text = 'Đã xóa';
            break;
          case false:
            color = 'green';
            text = 'Hiển thị';
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
      render: (text, record) => (
        <Space>
          <IconButton onClick={() => showDeleteConfirm(record)}>
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
        title="Thêm chi tiết"
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
          <Form.Item label="Màu" name="color" rules={[{ required: true, message: 'Nhập màu!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Kích thước" name="size" rules={[{ required: true, message: 'Nhập kích thước!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Nhập số lượng!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Sửa thông tin"
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
          <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Tên sản phẩm!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="image">
            <Upload>
              <Button>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Nhập mô tả sản phẩm!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Nhập số!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Thương hiệu" name="brandname">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Thể loại" name="category">
            <Input disabled />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
        onOk={handleDeleteShoe}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
    </>
  );
}
