import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter ({ children, role, allowedRoles }){
    return (
        allowedRoles.includes(role) ? children : <Navigate to="/403" replace />
    );
};