import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './Information.css'

export default function Information({ total }) {
  return (
    <Container className="information-container">
      <Paper elevation={3} className="information-paper">
        <Typography variant="h6" className="information-title">
          Tổng tiền: {total} $
        </Typography>
      </Paper>
    </Container>
  );
}
