import React from "react";
import Container from '@mui/material/Container';

// ------------------------------------------------------------------------

export default function Information({total}) {
  return (
    <Container>
      <p variant="body2" color="text.secondary">
        Total money: <br />
        {total} $
      </p>
    </Container>
  );
}