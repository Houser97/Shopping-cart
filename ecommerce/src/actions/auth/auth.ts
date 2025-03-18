'use server'
import shoppingApi from "@/config/api/shoppingApiAxios";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from 'next/headers';

export const login = async (email: string, password: string) => {

    try {
        const { data } = await shoppingApi.post('/auth/login-cookies', { email, password });
        const { token, user } = data;
        await Promise.all([
            setCookie('Authentication', token, { cookies }),
            setCookie('UserInfo', JSON.stringify(user), { cookies })
        ])
        return data;
    } catch (error) {
        console.log(error)
        return {};
    }

}

export const register = async (email: string, password: string, username: string) => {
    try {
        const { data } = await shoppingApi.post('/auth/register-cookies', { email, password, username });
        const { token, user } = data;
        await Promise.all([
            setCookie('Authentication', token, { cookies }),
            setCookie('UserInfo', JSON.stringify(user), { cookies })
        ])
        return data;
    } catch (error) {
        console.log(error)
        return {};
    }
}

export const validate = async () => {

    try {
        const cookieHeader = await getCookie('Authentication', { cookies })
        const { data } = await shoppingApi.get('/auth', {
            headers: {
                Cookie: `Authentication=${cookieHeader}`
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }

}
