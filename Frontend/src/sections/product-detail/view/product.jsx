import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import {useSearchParams} from "react-router-dom";
import {productDetail} from "src/api/products";

import 'src/global.css';

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');

  const [infor,
    setInfor] = useState();

  useEffect(() => {
    const fetchData = async() => {
      const result = await productDetail(productId);
      setInfor(result.data);
    };

    fetchData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));
  
  return (
    <Container>
      <Typography variant="h4" sx={{
        mb: 5
      }}>
        Product Detail
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={6} md={5}>
          <Item>
            <img src="https://source.unsplash.com/random" alt="" className="fixed-size-image"/>
          </Item>
        </Grid>
        <Grid xs={6} md={7}>
          <Grid item xs={12} sm={6}>
            <Item>{infor?.name}</Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>{infor?.description}</Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>Vận chuyển tới: Hoằng Trạch, Hoằng Hóa, Thanh Hóa</Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>Size: 30</Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>Số lượng: 1 Tổng 100 trong kho</Item>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item>Thêm vào giỏ hàng</Item>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}