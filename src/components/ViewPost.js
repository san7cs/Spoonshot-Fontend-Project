import React from 'react';

function ViewPost({ post, onEdit, onDelete }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Date: {post.date}</p> {/* Display date */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default ViewPost;
