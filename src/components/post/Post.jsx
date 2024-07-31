import React, { useState } from 'react';
import CommentList from '../commentlist/CommentList';
import './Post.css';

function Post({ post, onUpdatePost, onDeletePost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState(post);
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   const loadComments = async () => {
  //     const fetchedComments = await fetchComments(post.id);
  //     setComments(fetchedComments);
  //   };
  //   loadComments();
  // }, [post.id]);

  const handleUpdateClick = async () => {
    await onUpdatePost(post.id, editPost);
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    await onDeletePost(post.id);
  };

  return (
    <div className='post'>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editPost.title}
            onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
          />
          <textarea
            value={editPost.content}
            onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
          />
          <button onClick={handleUpdateClick}>Save</button>
          <button onClick={() => setIsEditing(false)} className='cancel-btn'>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)} className='edit-btn'>Edit</button>
          <button onClick={handleDeleteClick} className='delete-btn'>Delete</button>
        </div>
      )}
      <CommentList postId={post.id} />
    </div>
  );
}

export default Post;
