import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for the API
const API_URL = "https://66a5f5db23b29e17a1a15c93.mockapi.io/shoppingList";

// Create action
export const createUser = createAsyncThunk(
  "shoppingList/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Read action
export const showUser = createAsyncThunk(
  "shoppingList/showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// to update item bought or not
export const updateItemStatus = createAsyncThunk(
  "shoppingList/updateItemStatus",
  async ({ id, bought }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { bought },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete

export const deleteItem = createAsyncThunk(
  "shoppingList/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// edit Item

export const editItem = createAsyncThunk(
  "shoppingList/editItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${data.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateItemStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItemStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(editItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      //   .addCase(editItem.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.users = state.users.map((ele) =>
      //     ele.id === action.payload.id ? action.payload : ele
      //   );
      // })
      .addCase(editItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.items = state.items.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;

// old type of coding
// extraReducers: {
//   [createUser.pending]: (state) => {
//     state.loading = true;
//   },
//   [createUser.fulfilled]: (state, action) => {
//     state.loading = false;
//     state.items.push(action.payload);
//   },
//   [createUser.rejected]: (state, action) => {
//     state.loading = false;
//     state.error = action.payload.message;
//   }
// }
