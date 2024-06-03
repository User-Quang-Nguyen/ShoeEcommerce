import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user-detail/view';

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <UserView />
    </>
  );
}
