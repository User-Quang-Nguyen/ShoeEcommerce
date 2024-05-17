import * as React from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const FilledAlerts = ({ severity, content}) => (
    <Stack sx={{ width: '100%', marginBottom: 1}} spacing={2}>
        <Alert variant="filled" severity={severity}>
            {content}
        </Alert>
    </Stack>
);

FilledAlerts.propTypes = {
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    content: PropTypes.node.isRequired,
};

export default FilledAlerts;
