import { useDispatch } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
import shoppingApi from '../../config/api/shoppingApi';
import { useTypedSelector } from '../store/config/typed-selector';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await shoppingApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin(data.user));

        } catch (error) {
            console.log(error)
            dispatch(onLogout('Incorrect credentials'));
        }
    }

    const startRegister = async ({ email, password, username }) => {
        dispatch(onChecking());
        try {
            const { data } = await shoppingApi.post('/auth/register', { email, pwd: password, username });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin(data.user));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout(''));

        try {
            const { data } = await shoppingApi.get('/auth');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin(data.user));
        } catch (error) {
            startLogout();
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout(''));
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}