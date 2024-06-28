import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import SearchBar from '../search-view';
import ProductCard from '../product-card';
import ShopProductSort from '../product-sort';
import ProductCartWidget from '../product-cart-widget';
import { CenteredPagination } from 'src/components/pagination';
import { getProducts, searchShoe } from 'src/api/products';

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [temp, setTemp] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('random');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await searchShoe(searchQuery, currentPage, 10);
        } else {
          response = await getProducts(currentPage);
        }
        const { data, totalPages } = response;
        setProducts(data);
        setTotalPages(totalPages);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [currentPage, searchQuery]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchQuery(temp);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
    let sortedProducts = [...products];
    switch (sortOption) {
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price1':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'price2':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        sortedProducts = products;
    }
    setProducts(sortedProducts);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Sản phẩm
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <SearchBar
          value={temp}
          onChange={(event) => setTemp(event.target.value)}
          onSearch={handleSearch}
        />
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ShopProductSort onSortChange={handleSortChange} />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {Array.isArray(products) ? (
          products.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} id={product.id} />
            </Grid>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Grid>

      <ProductCartWidget />
      <CenteredPagination onPageChange={handleChange} count={totalPages} />
    </Container>
  );
}
