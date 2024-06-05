import { Helmet } from 'react-helmet-async';

import { ProductManageView } from 'src/sections/product-manage/view';

// ----------------------------------------------------------------------

export default function ProductManagePage() {
  return (
    <>
      <Helmet>
        <title> Shoe Ecommerce </title>
      </Helmet>

      <ProductManageView />
    </>
  );
}
