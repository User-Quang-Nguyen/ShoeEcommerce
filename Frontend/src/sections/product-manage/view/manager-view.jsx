import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Form, Input, Modal, Button, Row, Col, Select, Upload, InputNumber } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

import { productManagement } from "src/api/products";
import { getAllBrand } from "src/api/brand";
import { getAllCategory } from "src/api/category";
import { addNewShoe } from "src/api/products";
import Management from "../table";

// -----------------------------------------------------------------------------

export default function ProductManagerView() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [modalAdd, setModalAdd] = useState(false);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();

  const handleAddNewShoe = () => {
    setModalAdd(true);
    form.resetFields();
  }

  const handleCancel = () => {
    setModalAdd(false);
    form.resetFields();
  };

  const handleFormChange = (allValues) => {
    setValues({
      ...values,
      image: "",
      ...allValues
    })
  }

  const handleFormSubmit = async () => {
    await addNewShoe(values);
    setCount(count + 1);
    setModalAdd(false);
    form.resetFields();
  };

  useEffect(() => {
    const fetchdata = async () => {
      const response = await productManagement();
      const modifiedData = response.data.map(product => {
        const { id, detail, ...rest } = product;
        const modifiedDetails = detail.map(detailItem => {
          const { id: detailId, ...detailRest } = detailItem;
          return {
            ...detailRest,
            key: detailId
          };
        });
        return {
          ...rest,
          key: id,
          detail: modifiedDetails
        };
      });
      setData(modifiedData);

      const brandData = await getAllBrand();
      setBrand(brandData.data);

      const categoryData = await getAllCategory();
      setCategory(categoryData.data);
    };
    fetchdata();
  }, [count]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Order History</Typography>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
        <Button type="primary" onClick={() => { handleAddNewShoe() }}>
          Add Shoe
        </Button>
      </Stack>
      <Stack>
        <Management data={data} count={count} setCount={setCount} />
      </Stack>

      <Modal
        title="Add new shoe"
        visible={modalAdd}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          onValuesChange={handleFormChange}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Image" name="image">
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button>Select Image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Brand" name="brandid" rules={[{ required: true, message: 'Please select a brand!' }]}>
                <Select placeholder="Select a brand">
                  {
                    brand?.map(brand => {
                      return (
                        <Option key={brand.id} value={brand.id}>{brand.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select categories!' }]}>
                <Select mode="multiple" placeholder="Select categories">
                  {
                    category?.map(category => {
                      return (
                        <Option key={category.id} value={category.id}>{category.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Container>
  );
}
