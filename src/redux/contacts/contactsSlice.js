import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from 'redux/contacts/operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
  isDeleting: false,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.rejected]: handleRejected,
    // [deleteContact.pending]: handlePending,
    // [deleteContact.rejected]: handleRejected,

    [deleteContact.pending](state, action) {
      state.isLoading = true;
      state.isDeleting = true;
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.isDeleting = false;
      state.error = action.payload;
    },

    // ====== fetchContacts ====

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },

    // ====== Contact ====

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = [action.payload, ...state.items];
    },

    // ====== deleteContact ====

    [deleteContact.fulfilled](state, action) {
      state.isDeleting = false;
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
