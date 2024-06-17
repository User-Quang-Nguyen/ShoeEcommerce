import axios from 'axios';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import { CenteredPagination } from 'src/components/pagination';
import { getProducts } from 'src/api/products';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getProducts(currentPage);
        const {data} = response;
        setProducts(data);
      }catch(e){
        console.error(e);
      }
    }
    fetchData();
  }, [currentPage])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChange = (event, value) => {
    console.log(`Selected page: ${value}`);
    setCurrentPage(value);
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Sản phẩm
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {Array.isArray(products) ? (
          products.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} id={product.id}/>
          </Grid>
        ))) : (
          <p>No products available</p>
        )
      }
      </Grid>

      <ProductCartWidget />
      <CenteredPagination onPageChange = {handleChange} count={20}/>
    </Container>
  );
}
