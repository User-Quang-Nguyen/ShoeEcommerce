import { useState } from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';

const SORT_OPTIONS = [
  { value: 'random', label: 'Tự do' },
  { value: 'name', label: 'Tên sản phẩm' },
  { value: 'price1', label: 'Giá cao đến thấp' },
  { value: 'price2', label: 'Giá thấp đến cao' },
];

export default function ShopProductSort({ onSortChange }) {
  const [open, setOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState(SORT_OPTIONS[0]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setOpen(null);
    onSortChange(option.value);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sắp xếp: &nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {selectedOption.label}
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedOption.value}
            onClick={() => handleMenuItemClick(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
