import React, { useState, useEffect } from 'react';
import { fetchPosts, addPost, updatePost, deletePost } from '../api/posts'; 
import PostList from '../components/postlist/PostList';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  const handleAddPost = async (post) => {
    const newPost = await addPost(post);
    setPosts([...posts, newPost]);
  };

  const handleUpdatePost = async (id, updatedPost) => {
    const updated = await updatePost(id, updatedPost);
    setPosts(posts.map((post) => (post.id === id ? updated : post)));
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>Post List</h1>
      <PostList
        posts={posts}
        onAddPost={handleAddPost}
        onUpdatePost={handleUpdatePost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default Posts;
