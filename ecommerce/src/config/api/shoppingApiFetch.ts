import { cookies } from "next/headers";

const API_URL = 'http://localhost:3010/api'

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: any) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: 'error' };
  }
  return { error: "" };
};

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  });
  return res.json();
};