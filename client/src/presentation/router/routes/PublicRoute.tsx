import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../store/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface PublicRouteProps {
    children?: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { status } = useTypedSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (status === 'authenticated' && location.key === 'default') {
            navigate('/');
        }
        else if (status === 'authenticated' && !(location.key === 'default')) {
            navigate(-1);
        }
    }, [status, location.key]);

    return children ? <>{children}</> : <Outlet />;
};
