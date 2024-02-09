import { read } from './httpService';

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
