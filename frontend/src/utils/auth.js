const DEPLOYED_API_URL = 'https://role-based-blog-platform-production.up.railway.app/api/v1';
const API_BASE = import.meta.env.DEV
  ? '/api/v1'
  : (import.meta.env.VITE_API_URL || DEPLOYED_API_URL);

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const authFetch = async (endpoint, options = {}) => {
  return apiFetch(`/auth${endpoint}`, options);
};

export const getAuthenticatedUser = async () => {
  return authFetch('/me', {
    method: 'GET',
  });
};

export const getBlogs = async () => {
  return apiFetch('/blogs', {
    method: 'GET',
  });
};

export const createBlog = async (payload) => {
  return apiFetch('/blogs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateBlog = async (id, payload) => {
  return apiFetch(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const deleteBlog = async (id) => {
  return apiFetch(`/blogs/${id}`, {
    method: 'DELETE',
  });
};
