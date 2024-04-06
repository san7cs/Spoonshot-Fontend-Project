import React, { useState, useEffect } from 'react';
import CreateEditPost from './components/CreateEditPost';
import ViewPost from './components/ViewPost';
import DeletePost from './components/DeletePost';

function App() {

  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : [
      { id: 1, title: 'Default Post', content: 'This is the default post.', date: new Date().toLocaleString() }
    ];
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Saving posts to local storage whenever posts state changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleViewPost = (postId) => {
    const post = posts.find(post => post.id === postId);
    setSelectedPost(post);
  };

  const handleEditPost = (postId) => {
    const post = posts.find(post => post.id === postId);
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleDeletePost = (postId) => {
    const post = posts.find(post => post.id === postId);
    setSelectedPost(post);
    setIsDeleting(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedPost(null);
  };

  const handleSavePost = (postData) => {
    if (!postData.title.trim() || !postData.content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }
    if (isEditing) {
      const updatedPosts = posts.map(post =>
        post.id === selectedPost.id ? { ...post, ...postData, date: new Date().toLocaleString() } : post
      );
      setPosts(updatedPosts);
    } else {
      const newPost = {
        id: Date.now(),
        ...postData,
        date: new Date().toLocaleString()
      };
      setPosts([...posts, newPost]);
    }
    handleCancel();
  };

  const handleDelete = () => {
    const updatedPosts = posts.filter(post => post.id !== selectedPost.id);
    setPosts(updatedPosts);
    handleCancel();
  };

  return (
    <div>
      <h1>My Blog</h1>
      {isCreating || isEditing ? (
        <CreateEditPost
          onSave={handleSavePost}
          onCancel={handleCancel}
          postToEdit={selectedPost}
        />
      ) : isDeleting ? (
        <DeletePost onDelete={handleDelete} />
      ) : selectedPost ? (
        <ViewPost
          post={selectedPost}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setIsDeleting(true)}
        />
      ) : (
        <div>
          <h2>Posts</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h3 onClick={() => handleViewPost(post.id)}>{post.title}</h3>
                <p>{post.content.slice(0, 50)}...</p>
                <p>Date: {post.date}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsCreating(true)}>Create New Post</button>
        </div>
      )}
    </div>
  );
}

export default App;
