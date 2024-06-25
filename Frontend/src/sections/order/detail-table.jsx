import React from 'react';
import {Table} from 'antd';
const {Column} = Table;

export default function DetailTable({data}) {
  return (
    <Table dataSource={data} pagination={false}>
      <Column title="Tên" dataIndex="name" key="name"/>
      <Column title="Hình ảnh" dataIndex="image" key="image"  render={(text, record) => (
          <img src="/assets/images/products/product_1.jpg" alt={record.name} style={{ width: 100, height: 'auto' }} />
        )}/>
      <Column title="Màu" dataIndex="color" key="color"/>
      <Column title="Kích cỡ" dataIndex="size" key="size"/>
      <Column title="Thương hiệu" dataIndex="brandname" key="brandname"/>
      <Column title="Giá" dataIndex="price" key="price"/>
      <Column title="Số lượng" dataIndex="quantity" key="quantity"/>
    </Table>
  )
}