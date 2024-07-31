import React, { useState } from 'react';
import Comment from '../comment/Comment';
import { addComment, updateComment, deleteComment, fetchComments } from '../../api/posts';
import './CommentList.css';

function CommentList({ postId }) {
  const [newComment, setNewComment] = useState({ content: '' });
  const [comments, setComments] = useState([]);
  React.useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    };
    loadComments();
  }, [postId]);
  const handleAddClick = async () => {
    const commentToAdd = { ...newComment, postId };
    await addComment(commentToAdd);
    setNewComment({ content: '' });
    setComments([...comments, commentToAdd]);
  };

  const handleUpdateComment = async (id, updatedComment) => {
    await updateComment(id, updatedComment);
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, ...updatedComment } : comment
    );
    setComments(updatedComments);
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className='comment-list'>
      <div>
        <textarea
          placeholder="Add a comment"
          value={newComment.content}
          onChange={(e) => setNewComment({ content: e.target.value })}
        />
        <button onClick={handleAddClick}>Add Comment</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
