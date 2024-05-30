import { Helmet } from 'react-helmet-async';

import { OrderView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <OrderView />
    </>
  );
}
