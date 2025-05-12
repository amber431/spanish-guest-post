import { createSlice } from '@reduxjs/toolkit';

const loadMessages = () => {
  const messages = localStorage.getItem('messages');
  return messages ? JSON.parse(messages) : [];
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: loadMessages(),
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('messages', JSON.stringify(state.messages)); 
    },
    clearMessages: (state) => {
      state.messages = [];
      localStorage.removeItem('messages');
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
