import React from 'react';
import {Button, Table} from 'antd';

// -------------------------------------------------------------------
export default function CartTable({handleDecrement, handleIncrement, handleDelete, data, quantities}) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Image',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    }, {
      title: 'Quantity',
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
      title: 'More infor',
      dataIndex: 'more',
      key: 'more'
    }, {
      title: 'Brand',
      dataIndex: 'brandname',
      key: 'brandname'
    }, {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    }, {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <a onClick={() => {handleDelete(record)}}>Delete</a>
    }
  ];

  return (<Table pagination={false} columns={columns} dataSource={data}/>);
}