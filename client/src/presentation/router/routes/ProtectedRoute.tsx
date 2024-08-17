import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../store/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface ProtectedRouteProps {
    redirectPath?: string;
    children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath = '/login',
    children,
}) => {
    const { status } = useTypedSelector(state => state.auth);

    if (status !== 'authenticated') {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};