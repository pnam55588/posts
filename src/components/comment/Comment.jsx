import React, { useState } from 'react';
import './Comment.css';
function Comment({ comment, onUpdateComment, onDeleteComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(comment);

  const handleUpdateClick = async () => {
    await onUpdateComment(comment.id, editComment);
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    await onDeleteComment(comment.id);
  };

  return (
    <div className='comment'>
      {isEditing ? (
        <div>
          <textarea
            value={editComment.content}
            onChange={(e) => setEditComment({ ...editComment, content: e.target.value })}
          />
          <button onClick={handleUpdateClick}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
          <button onClick={() => setIsEditing(true)} className='edit-btn'>Edit</button>
          <button onClick={handleDeleteClick} className='delete-btn'>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
