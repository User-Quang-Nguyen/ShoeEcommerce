import { Helmet } from 'react-helmet-async';

import { ProductDetail } from 'src/sections/product-detail/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Product Detail </title>
      </Helmet>

      <ProductDetail />
    </>
  );
}
