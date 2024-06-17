import { Helmet } from 'react-helmet-async';

import { ForbiddenView } from 'src/sections/error';
// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 403 Forbidden Error </title>
      </Helmet>

      <ForbiddenView />
    </>
  );
}
