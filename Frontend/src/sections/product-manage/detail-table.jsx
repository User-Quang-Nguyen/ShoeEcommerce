import React, { useState, useEffect } from 'react';
import { Table, Space, Modal, Form, Input, Button, InputNumber } from 'antd';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { updateShoeDetail } from 'src/api/products';

// --------------------------------------------------------------------------------

const { Column } = Table;

export default function DetailTable({ data, count, setCount }) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedRecord) {
      setFormValues({
        id: selectedRecord.key,
        color: selectedRecord.color,
        size: selectedRecord.size,
        quantity: selectedRecord.quantity,
      });
    }
  }, [selectedRecord]);

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setFormValues({
      id: record.key,
      color: record.color,
      size: record.size,
      quantity: record.quantity,
    });
    setDialogVisible(true);
    form.resetFields();
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    form.resetFields();
  };

  const handleFormChange = ( allValues) => {
    setFormValues({
      ...formValues,
      ...allValues,
    });
  };

  const handleFormSubmit = async () => {
    const result = await updateShoeDetail(formValues);
    setCount(count + 1);
    setDialogVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Table dataSource={data} pagination={false}>
        <Column title="ID" dataIndex="key" key="key" />
        <Column title="Color" dataIndex="color" key="color" />
        <Column title="Size" dataIndex="size" key="size" />
        <Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Column
          title="Action"
          dataIndex="x"
          key="x"
          render={(text, record) => (
            <Space>
              <IconButton onClick={() => handleEditClick(record)}>
                <Iconify icon="material-symbols:edit" />
              </IconButton>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Edit Information"
        visible={isDialogVisible}
        onCancel={handleDialogClose}
        footer={null}
      >
        <Form
          form={form}
          initialValues={selectedRecord}
          onValuesChange={handleFormChange}
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
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please input quantity!' }]}>
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
