import React, { useState } from 'react';
import Post from '../post/Post';
import './PostList.css';

function PostList({ posts, onAddPost, onUpdatePost, onDeletePost }) {
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleAddClick = async () => {
    await onAddPost(newPost);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className='post-list'>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={handleAddClick}>Add Post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post
              post={post}
              onUpdatePost={onUpdatePost}
              onDeletePost={onDeletePost}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
