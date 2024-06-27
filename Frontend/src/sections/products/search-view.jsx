import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';


export default function SearchBar({ value, onChange, onSearch }) {
    return (
      <TextField
        variant="outlined"
        placeholder="Tìm kiếm sản phẩm..."
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <Iconify icon="eva:search-fill" /> */}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch}>
                <Iconify icon="eva:search-fill" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }