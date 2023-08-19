import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://todo-backend-dha0.onrender.com/api";
const initialState = {
  todos: [],
  addTodoStatus: "",
  addTodoError: "",
  getTodoStatus: "",
  getTodoError: "",
  updateTodoStatus: "",
  updateTodoError: "",
  deleteTodoStatus: "",
  deleteTodoError: "",
};

export const todoAdd = createAsyncThunk(
  "todos/todoAdd",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/todos`, todo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/todos`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//async is important else it will show the undefined data becuause it take time to take the data fom backend and we also need to add await fr this
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const { _id, task, isComplete, date } = todo;
      console.log(todo);
      const response = await axios.put(`${baseUrl}/todos/${_id}`, {
        task,
        isComplete,
        date,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/todos/${_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [todoAdd.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "pending",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [todoAdd.fulfilled]: (state, action) => {
      //state.todos.push(action.payload)   we can also do like this
      return {
        todos: [action.payload, ...state.todos],
        addTodoStatus: "success",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [todoAdd.rejected]: (state, action) => {
      //state.todos.push(action.payload)   we can also do like this
      return {
        ...state,
        addTodoStatus: "rejected",
        addTodoError: action.payload, //its comming from backend using createasync thunk
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    //get todo request

    [getTodos.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "pending",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [getTodos.fulfilled]: (state, action) => {
      //state.todos.push(action.payload)   we can also do like this
      return {
        todos: action.payload,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "success",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [getTodos.rejected]: (state, action) => {
      //state.todos.push(action.payload)   we can also do like this
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "rejected",
        getTodoError: action.payload, //its comming from backend using createasync thunk
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    //Put request or update request
    [updateTodo.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "pending",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [updateTodo.fulfilled]: (state, action) => {
      console.log(action.payload);
      const updatedTodos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      ); //if todos frontend id match with backends id then replaced the action.paylods means backends id with new else do as it is

      return {
        ...state,
        todos: updatedTodos,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "success",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    [updateTodo.rejected]: (state, action) => {
      //state.todos.push(action.payload)   we can also do like this
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "rejected",
        updateTodoError: action.payload, //its comming from backend using createasync thunk"
        deleteTodoStatus: "",
        deleteTodoError: "",
      };
    },

    //delete TOdos

    [deleteTodo.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "pending",
        deleteTodoError: "",
      };
    },

    [deleteTodo.fulfilled]: (state, action) => {
      console.log(action.payload);
      const currentTodos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      ); //if todos frontend id match with backends id then replaced the action.paylods means backends id with new else do as it is

      return {
        ...state,
        todos: currentTodos,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "success",
        deleteTodoError: "",
      };
    },

    [deleteTodo.rejected]: (state, action) => {
      //state.todos.push(action.payload)   we can also do like this
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "", //its comming from backend using createasync thunk"
        deleteTodoStatus: "rejected",
        deleteTodoError: action.payload,
      };
    },
  },
});

export default todoSlice.reducer;
