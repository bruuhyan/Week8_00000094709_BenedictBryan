let localPosts: any[] = [];

export const getLocalPosts = () => localPosts;

export const addLocalPost = (post: any) => {
  localPosts = [post, ...localPosts];
};