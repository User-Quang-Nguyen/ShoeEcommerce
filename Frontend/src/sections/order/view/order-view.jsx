import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import {getOrders} from "src/api/order";
import OrderTable from "../table";

// -----------------------------------------------------------------------------

export default function OrderView() {
  const [data,
    setData] = useState([]);

  useEffect(() => {
    const fetchdata = async() => {
      const response = await getOrders();
      const modifiedData = response
        .data
        .map(item => {
          const {
            id,
            ...rest
          } = item;
          return {
            ...rest,
            key: id
          };
        });
      setData(modifiedData);
    };
    fetchdata();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}>
        <Typography variant="h4">Order History</Typography>
      </Stack>

      <Stack>
        <OrderTable data={data}/>
      </Stack>
    </Container>
  );
}