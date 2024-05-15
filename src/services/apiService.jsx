import { read, create } from './httpService';

import axios from 'axios';

export async function apiGetPage(id, language) {
  const pageContent = await read(`/pages/${id}?lang=${language}`);
  return pageContent;
}

export async function apiGetPostType(slug, language) {
  const postTypeContent = await read(`/${slug}?lang=${language}`);
  return postTypeContent;
}

export async function apiGetPostBySlug(slug, language) {
  const postTypeContent = await read(
    `/methodology?slug=${slug}&lang=${language}`
  );
  return postTypeContent;
}

export async function apiSendForm(data) {
  const customUrl = 'https://sti7ch.com/wp-json/myapi/v1/send-form/';
  const response = await axios.post(customUrl, data);
  return response.data;
}
