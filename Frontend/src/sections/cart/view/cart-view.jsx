import React, {useEffect, useState} from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import CartTable from '../cart-table';
import {deleteItem, getCartItems, updateQuantity} from 'src/api/cart';

// -----------------------------------------------------------------------------
// -

export default function CartView() {
  const [data,
    setData] = useState([]);
  const [quantities,
    setQuantities] = useState({});
  const [error,
    setError] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const rawData = await getCartItems();
        const realData = rawData.data.items;
        if (Array.isArray(realData)) {
          const newData = realData.map(item => ({
            key: item.id, id: item.id, cartshoeid: item.cartshoeId, name: item.name,
            // image: item.image,
            image: '/assets/images/products/product_2.jpg',
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            more: item.color + ', ' + item.size,
            brandname: item.brandname,
            category: item.category
          }));

          setData(newData);
        } else {
          setError(true);
          console.error('Expected array but received:', rawData);
        }
      } catch (error) {
        setError(true);
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    if (data.length > 0) {
      const initialQuantities = data.reduce((acc, item) => ({
        ...acc,
        [item.id]: item.quantity
      }), {});
      setQuantities(initialQuantities);
    }
  }, [data]);

  const handleDelete = (record) => {
    console.log(record);
    const formData = {
      id: record.cartshoeid
    }
    deleteItem(formData);
    setCount(count + 1);
  }

  const handleIncrement = (record) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [record.id]: (prevQuantities[record.id] || 0) + 1
      };
      const formData = {
        cartshoeid: record.cartshoeid,
        quantity: updatedQuantities[record.id]
      };
      updateQuantity(formData);
      return updatedQuantities;
    });
  };

  const handleDecrement = (record) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [record.id]: Math.max(prevQuantities[record.id] - 1, 1)
      };
      const formData = {
        cartshoeid: record.cartshoeid,
        quantity: updatedQuantities[record.id]
      };
      updateQuantity(formData);
      return updatedQuantities;
    });
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}>
        <Typography variant="h4">Cart</Typography>
      </Stack>
      {error
        ? (
          <p>Not logged in yet</p>
        )
        : (
          <Stack>
            <CartTable
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleDelete={handleDelete}
              data={data}
              quantities={quantities}/>
          </Stack>
        )
}
    </Container>
  );
}