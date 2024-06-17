import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { fCurrency } from 'src/utils/format-number';
import { addToCart } from 'src/api/cart';
import { useEffect, useState } from 'react';
import { Snackbar } from 'src/components/notification';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, id }) {
  const route = useRouter();
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFail(false);
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fail,success])

  const onChange = async (event) => {
    const formData = {
      "shoeid": id,
      "quantity": 1
    }

    const result = await addToCart(formData);
    setSuccess(result.data.status);
    setFail(!result.data.status);
  }

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      // src={product.image}
      src='assets/images/products/product_3.jpg'
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
       />
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  const handleClick = (event) => {
    event.preventDefault();
    route.push(`/product?id=${id}`)
  };

  return (
    <Card>
      {success && (
        <Snackbar message={"Thêm giỏ hàng thành công !!!"}/>
      )}
      {fail && (
        <Snackbar message={"Thêm giỏ hàng thất bại!!!"}/>
      )}
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap href='#' onClick={handleClick}>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <IconButton color="primary" aria-label="add to shopping cart" onClick={onChange}>
            <AddShoppingCartIcon onChange = {onChange}/>
          </IconButton> */}
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
