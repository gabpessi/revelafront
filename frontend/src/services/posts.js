import { apiFetch, getImageUrl } from './api';

export async function getFeedPosts() {
  const posts = await apiFetch('/posts');
  return posts.map(post => {
    const url = getImageUrl(post.imagem);
    return {
      id: post.id,
      profilePic: post.user && post.user.profile_picture ? post.user.profile_picture : '',
      username: post.user && post.user.username ? post.user.username : 'Usuário',
      postPic: url,
      postDescription: post.text || '',
    };
  });
}