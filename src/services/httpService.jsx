import axios from 'axios';

/*const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://embol-yzffe.ondigitalocean.app/api';
*/

const BASE_URL = 'https://sti7ch.com/wp-json/wp/v2';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function read(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function exclude(url) {
  await axiosInstance.delete(url);
}

export async function create(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function edit(url, object) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}
