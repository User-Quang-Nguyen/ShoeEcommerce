import React from 'react';
import {Button, Table} from 'antd';

// -------------------------------------------------------------------
export default function CartTable({handleDecrement, handleIncrement, handleDelete, data, quantities}) {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img
          src={text}
          alt="product"
          style={{
          width: '50px',
          height: '50px'
        }}/>
    }, {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    }, {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price'
    }, {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button onClick={() => handleDecrement(record)}>-</Button>
          <span style={{
            margin: '0 10px'
          }}>{quantities[record.id] || 0}</span>
          <Button onClick={() => handleIncrement(record)}>+</Button>
        </div>
      )
    }, {
      title: 'Thông tin thêm',
      dataIndex: 'more',
      key: 'more'
    }, {
      title: 'Thương hiệu',
      dataIndex: 'brandname',
      key: 'brandname'
    }, {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category'
    }, {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <a onClick={() => {handleDelete(record)}}>Delete</a>
    }
  ];

  return (<Table pagination={false} columns={columns} dataSource={data}/>);
}