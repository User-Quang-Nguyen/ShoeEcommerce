import React from 'react';
import {Table} from 'antd';
const {Column} = Table;

export default function DetailTable({data}) {
  return (
    <Table dataSource={data} pagination={false}>
      <Column title="Name" dataIndex="name" key="name"/>
      <Column title="Image" dataIndex="image" key="image"  render={(text, record) => (
          <img src={text} alt={record.name} style={{ width: 100, height: 'auto' }} />
        )}/>
      <Column title="Color" dataIndex="color" key="color"/>
      <Column title="Size" dataIndex="size" key="size"/>
      <Column title="Brand" dataIndex="brandname" key="brandname"/>
      <Column title="Price" dataIndex="price" key="price"/>
      <Column title="Quantity" dataIndex="quantity" key="quantity"/>
    </Table>
  )
}