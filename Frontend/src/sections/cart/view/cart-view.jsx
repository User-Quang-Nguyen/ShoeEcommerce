import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CartTable from '../cart-table';
import { deleteItem, getCartItems, updateQuantity } from 'src/api/cart';
import OrderButton from '../order-button';
import Information from '../information';
import { getTotalMoney, order } from 'src/api/order';
import { getUserInfor } from 'src/api/account';
import '../cartview.css';
import AutohideNoti from 'src/components/notification/autohide';

export default function CartView() {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState('');
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchTotalMoney = async () => {
    try {
      const totalResponse = await getTotalMoney();
      setTotal(totalResponse.data);
    } catch (error) {
      console.error('Failed to fetch total money:', error);
    }
  };

  const fetchAddress = async () => {
    try {
      const addressResponse = await getUserInfor();
      setAddress(addressResponse.data.address);
    } catch (error) {
      console.error('Failed to fetch address:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTotalMoney();
        await fetchAddress();
        const cartResponse = await getCartItems();
        const cartItems = cartResponse.data.items;

        if (Array.isArray(cartItems)) {
          const newData = cartItems.map(item => ({
            key: item.id,
            id: item.id,
            cartshoeid: item.cartshoeid,
            name: item.name,
            image: '/assets/images/products/product_2.jpg', // Placeholder image
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
          console.error('Expected array but received:', cartResponse);
        }
      } catch (error) {
        setError(true);
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [count, open]);

  useEffect(() => {
    if (data.length > 0) {
      const initialQuantities = data.reduce((acc, item) => ({
        ...acc,
        [item.id]: item.quantity
      }), {});
      setQuantities(initialQuantities);
    }
  }, [data, open]);

  const handleDelete = async (record) => {
    try {
      const formData = { id: record.cartshoeid };
      await deleteItem(formData);
      setCount(count + 1);
      await fetchTotalMoney();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleIncrement = async (record) => {
    try {
      setQuantities((prevQuantities) => {
        const updatedQuantities = {
          ...prevQuantities,
          [record.id]: (prevQuantities[record.id] || 0) + 1
        };
        return updatedQuantities;
      });
      const formData = { cartshoeid: record.cartshoeid, quantity: quantities[record.id] + 1 };
      await updateQuantity(formData);
      await fetchTotalMoney(); // Update total after quantity change
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleDecrement = async (record) => {
    try {
      setQuantities((prevQuantities) => {
        const updatedQuantities = {
          ...prevQuantities,
          [record.id]: Math.max(prevQuantities[record.id] - 1, 1)
        };
        return updatedQuantities;
      });
      const formData = { cartshoeid: record.cartshoeid, quantity: Math.max(quantities[record.id] - 1, 1) };
      await updateQuantity(formData);
      await fetchTotalMoney(); // Update total after quantity change
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handlerOrder = async () => {
    try {
      const response = await order();
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);
      if (response.data.status === true) {
        setOpen(open + 1);
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      setSnackbarMessage('Đặt hàng không thành công');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className="cart-view-container">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Giỏ hàng</Typography>
      </Stack>
      {error ? (
        <p>Bạn chưa đăng nhập</p>
      ) : (
        <Stack>
          <CartTable
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleDelete={handleDelete}
            data={data}
            quantities={quantities}
          />
        </Stack>
      )}

      <Stack className="cart-summary">
        <div className="cart-address">
          <Typography variant="h6">Giao hàng đến:</Typography>
          <Typography variant="body1">{address}</Typography>
          <a href="/profile" className="change-address">Thay đổi</a>
        </div>
        <div className="cart-total">
          <div className="total-information">
            {total > 0 && <Information total={total} />}
          </div>
          <OrderButton handlerOrder={handlerOrder} />
        </div>
      </Stack>
      <AutohideNoti message={snackbarMessage} open={snackbarOpen} onClose={handleCloseSnackbar} />
    </Container>
  );
}
