import { read } from './httpService';

export async function apiGetPage(id) {
  const pageContent = await read(`/pages/${id}`);
  return pageContent;
}

export async function apiGetPostType(slug) {
  const postTypeContent = await read(`/${slug}`);
  return postTypeContent;
}

export async function apiGetPostBySlug(slug) {
  const postTypeContent = await read(`/methodology?slug=${slug}`);
  return postTypeContent;
}
