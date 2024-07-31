// Utility function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility function to simulate random delay between 200ms to 1000ms
const randomDelay = () => delay(Math.floor(Math.random() * 800) + 200);

// LocalStorage keys
const POSTS_KEY = 'posts';
const COMMENTS_KEY = 'comments';

// Initialize data in localStorage if not present
if (!localStorage.getItem(POSTS_KEY)) {
  localStorage.setItem(POSTS_KEY, JSON.stringify([]));
}

if (!localStorage.getItem(COMMENTS_KEY)) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify([]));
}

// API simulation functions

// Fetch all posts
const fetchPosts = async () => {
  await randomDelay();
  const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
  return posts;
};

// Add a new post
const addPost = async (post) => {
  await randomDelay();
  const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
  const newPost = { ...post, id: Date.now() };
  posts.push(newPost);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return newPost;
};

// Update a post
const updatePost = async (id, updatedPost) => {
  await randomDelay();
  const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex > -1) {
    posts[postIndex] = { ...posts[postIndex], ...updatedPost };
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    return posts[postIndex];
  }
  throw new Error('Post not found');
};

// Delete a post
const deletePost = async (id) => {
  await randomDelay();
  let posts = JSON.parse(localStorage.getItem(POSTS_KEY));
  let comments = JSON.parse(localStorage.getItem(COMMENTS_KEY));
  posts = posts.filter((post) => post.id !== id);
  comments = comments.filter((comment) => comment.postId !== id);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  return id;
};

// Fetch comments for a specific post
const fetchComments = async (postId) => {
  await randomDelay();
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY));
  return comments.filter((comment) => comment.postId === postId);
};

// Add a new comment
const addComment = async (comment) => {
  await randomDelay();
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY));
  const newComment = { ...comment, id: Date.now() };
  comments.push(newComment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  return newComment;
};

// Update a comment
const updateComment = async (id, updatedComment) => {
  await randomDelay();
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY));
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex > -1) {
    comments[commentIndex] = { ...comments[commentIndex], ...updatedComment };
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    return comments[commentIndex];
  }
  throw new Error('Comment not found');
};

// Delete a comment
const deleteComment = async (id) => {
  await randomDelay();
  let comments = JSON.parse(localStorage.getItem(COMMENTS_KEY));
  comments = comments.filter((comment) => comment.id !== id);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  return id;
};

export { fetchPosts, addPost, updatePost, deletePost, fetchComments, addComment, updateComment, deleteComment };
