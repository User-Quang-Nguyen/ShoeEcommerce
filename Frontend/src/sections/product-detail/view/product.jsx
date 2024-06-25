import React, {useEffect, useState} from "react";
import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useSearchParams} from "react-router-dom";
import {productDetail} from "src/api/products";
import { addToCart } from "src/api/cart";
import { Snackbar } from "src/components/notification";

import 'src/global.css';

// ------------------------------------------------------------------------

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  const [infor,
    setInfor] = useState();
  const [selectedColor,
    setSelectedColor] = useState('');
  const [availableSizes,
    setAvailableSizes] = useState([]);
  const [selectedSize,
    setSelectedSize] = useState('');
  const [quantity,
    setQuantity] = useState(1);
  const [showNotification,
    setShowNotification] = useState(false);
  const [quan, setQuan] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      const result = await productDetail(productId);
      setInfor(result.data);
    };

    fetchData();
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const sizes = infor
      .detail
      .filter((detail) => detail.color === color)
      .map((detail) => detail.size);
    setAvailableSizes(sizes);
    setSelectedSize('');
  };

  const findById = () => {
    const detail = infor.detail;
    let prdi = 1;
    detail?.map((item) => {
      if (item.color === selectedColor && item.size === selectedSize) {
        console.log(item);
        prdi = item.id;
        setQuan(item.quantity);
      }
    });
    return prdi;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    findById();
  };

  const addTo_Cart = async () => {
    const prdi = await findById();
    const formData = {
      shoeid: prdi,
      quantity: quantity
    }
    const result = await addToCart(formData);
    if (result.data.status === true) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityChange = (event) => {
    if (event.target.value > 0) {
      setQuantity(event.target.value);
    }else{
      alert("Quantity must be greater than 0");
    }
  };

  const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark'
      ? '#1A2027'
      : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }));

  const getColorButtonStyle = (color) => ({
    backgroundColor: color === 'White'
      ? 'Gray'
      : color,
    color: 'White',
    margin: '4px'
  });

  return (
    <Container>
      <Typography variant="h4" sx={{
        mb: 5
      }}>
        Chi tiết sản phẩm
      </Typography>

      {showNotification && (
        <Snackbar
          message="Thêm giỏ hàng thành công"
          type="error"
        />
      )}

      <Grid container spacing={2}>
        <Grid xs={6} md={5}>
          <Item>
            <img
              src="https://source.unsplash.com/random"
              alt=""
              className="fixed-size-image"/>
          </Item>
        </Grid>
        <Grid xs={6} md={7}>
          <Grid item xs={12} sm={6}>
            <Item>
              <p>
                A product from the {infor?.brandname} brand named {infor?.name} is described as {infor?.description}. Carefully selected premium materials provide softness, breathability, ensuring your feet are always pampered and optimally protected. {infor?.name} is not just a pair of shoes, but also a declaration of your personality.
              </p>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              Thể loại: {infor
                ?.category.join(', ')}
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              Giá: {infor
                ?.price} $
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>{infor && (
                <div>
                  <h3>Màu:</h3>
                  {infor
                    .detail
                    .reduce((uniqueColors, detail) => {
                      if (!uniqueColors.includes(detail.color)) {
                        uniqueColors.push(detail.color);
                      }
                      return uniqueColors;
                    }, [])
                    .map((color) => (
                      <Button
                        key={color}
                        style={getColorButtonStyle(color)}
                        onClick={() => handleColorSelect(color)}>
                        {color}
                      </Button>
                    ))}
                </div>
              )}
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              {selectedColor && (
                <div>
                  <h3>Kích thước:</h3>
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant="outlined"
                      onClick={() => handleSizeSelect(size)}
                      sx={{
                      mr: 1,
                      mb: 1
                    }}>
                      {size}
                    </Button>
                  ))}
                </div>
              )}
            </Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>
              {selectedSize && (
                <div>
                  <h3>Số lượng:</h3>
                  <div
                    style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Button onClick={handleDecreaseQuantity} sx={{ fontSize: '1.5rem' }}>-</Button>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      InputProps={{
                      inputProps: {
                        min: 1
                      }
                    }}
                      sx={{
                      mx: 2,
                      width: '50px',
                    }}/>
                      <Button sx={{ fontSize: '1.5rem' }} onClick={handleIncreaseQuantity}>+</Button>
                        <p>Số lượng trong kho: {quan}</p>
                  </div>
                  <Button
                    onClick={addTo_Cart}
                    sx={{ mt: 2, mx: 'auto', display: 'block' }}
                    variant="contained">Thêm vào giỏ</Button>
                </div>
              )}
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}