import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';
import { deleteUser, getAllUsers } from 'src/api/user';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { Snackbar } from 'src/components/notification';

// ----------------------------------------------------------------------

export default function ProductManagePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([]);

  const [error, setError] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchdata = async() => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    fetchdata();
  }, [count]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleDelete = async (event, id) => {
    const formData = {
      "userid": id
    };
    try{
      const result = await deleteUser(formData);
      if (result.data.status === false) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }else{
        setCount(count + 1);
      }
    }catch(e){
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Product Management</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'phonenumber', label: 'Phone' },
                  { id: 'address', label: 'Address' },
                  { id: 'gender', label: 'Gender', align: 'center' },
                  { id: 'isdeleted', label: 'Status' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      status={row.isdeleted}
                      email={row.email}
                      phonenumber={row.phonenumber}
                      address={row.address}
                      gender={row.gender}
                      role={row.role}
                      isdeleted={row.isdeleted}
                      handleDelete={(event) => handleDelete(event, row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      { error && <Snackbar
          message="Xóa người dùng thất bại!"
          type="error"
        />}
    </Container>
  );
}
