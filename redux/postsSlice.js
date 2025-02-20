import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch Posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add Post
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
});

// Update Post
export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post);
  return response.data;
});

// Delete Post
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
  await axios.delete(`${API_URL}/${postId}`);
  return postId;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state?.posts,...action.payload];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
