import './App.css'
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_BASE}/posts?_limit=5`)
      .then(res => res.json())
      .then((data: Post[]) => setPosts(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Vite ENV Test</h1>
      <p><b>API URL:</b> {API_BASE}</p>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <b>{post.title}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
