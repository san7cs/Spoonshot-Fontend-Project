import React from 'react';

function DeletePost({ onDelete }) {
  return (
    <div>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={onDelete}>Yes</button>
      <button>No</button>
    </div>
  );
}

export default DeletePost;
