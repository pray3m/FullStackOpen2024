import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      anecdoteToChange.votes++;
    },
    createAnecdote(state, action) {
      const newAnecdote = action.payload;
      state.push(newAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
