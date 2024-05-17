import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const CenteredPagination = ({ onPageChange, count = 10 }) => {
    const handleChange = (event, value) => {
        onPageChange(event, value);
      };
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '10vh', // Chiều cao toàn màn hình
        paddingTop: '4em', // Padding xung quanh
      }}
    >
      <Stack spacing={2}>
        <Pagination 
          count= {count}
          onChange={handleChange} 
          sx={{
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            }
          }}
        />
      </Stack>
    </Box>
  );
}

export default CenteredPagination;