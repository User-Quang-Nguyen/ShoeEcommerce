import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  avatar,
  name,
  email,
  phonenumber,
  address,
  gender,
  role,
  isdeleted,
  handleClick,
  handleDelete
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    handleDelete(id);
    handleCloseDialog();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src="assets/images/avatar_1.jpg" />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phonenumber}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>{gender == 0 ? "Nam" : "Nữ"}</TableCell>

        <TableCell>
          {
            isdeleted ? <Label color="error">Vô hiệu hóa</Label> : <Label color="success">Hoạt động</Label>
          }
        </TableCell>

        <TableCell align="right">
          {
            !isdeleted && role != 1 ? (
              <IconButton onClick={handleOpenDialog}>
                <Iconify icon="material-symbols:delete" />
              </IconButton>
            ) : null
          }
        </TableCell>
      </TableRow>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn xóa {name} khỏi hệ thống?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phonenumber: PropTypes.string,
  address: PropTypes.string,
  gender: PropTypes.number,
  role: PropTypes.number,
  isdeleted: PropTypes.bool,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func.isRequired,
};
