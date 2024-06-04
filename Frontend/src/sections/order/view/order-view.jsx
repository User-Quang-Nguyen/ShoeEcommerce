import React, {useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

import {adminGetOrders, getOrders} from "src/api/order";
import OrderTable from "../table";
import AdminOrderTable from "../admin-table";

// -----------------------------------------------------------------------------

export default function OrderView() {
  const account = useSelector(state => state.account);
  const role = account.role;
  const [data,
    setData] = useState([]);

  useEffect(() => {
    const fetchdata = async() => {
      const response = await (role == 1 ? adminGetOrders() : getOrders());

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
      {
        role == 0 ? <Stack>
                      <OrderTable data={data}/>
                    </Stack> 
                  : 
                    <Stack>
                      <AdminOrderTable data={data}/>
                    </Stack>
      }
    </Container>
  );
}