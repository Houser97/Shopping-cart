import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../store/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface PublicRouteProps {
    children?: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { status } = useTypedSelector(state => state.auth);
    const location = useLocation();
    const previousPath = location.state?.from?.pathname || '/';

    if (status === 'authenticated') {
        return <Navigate to={previousPath} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
