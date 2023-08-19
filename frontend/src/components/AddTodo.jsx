// import { useState } from "react";  ..we also wanna remove this
import { Button,Alert,CircularProgress } from "@mui/material";
import "../App.css";
import {useDispatch,useSelector}  from "react-redux"
import { todoAdd, updateTodo } from "../store/slices/todoSlice";


const AddTodo = ({todo,setTodo}) => {
  const dispatch = useDispatch();
  const todoState = useSelector((state) => state.todosState);  //comes from the store 
  console.log(todoState);
  /* const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
  }); */  //we need to add to the app.js so we can access these at both side addtodo and listtodos and we can pass the props for these two and access those 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo._id);
    
    if(todo._id){
      dispatch(updateTodo(todo));
    }else{
      const newTodo = {
        ...todo,
        date : new Date(),
      }
      dispatch(todoAdd(newTodo));
    }

    setTodo({
      task: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: "0.9rem 0rem",
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
          {
            todoState.addTodoStatus === "pending" ? (
              <CircularProgress size={24} color="secondary"/>
            ) : todo._id ? ("Update Task") : (
              "Add Task"
            )
          }
        </Button>
        {
          todoState.addTodoStatus === "rejected" ? (
            <Alert severity="error">{todoState.addTodoError}</Alert>
          ) : null
        }
        {
          todoState.addTodoStatus === "success" ? (
            <Alert severity="success">Task Added...</Alert>
          ) : null
        }
         {
          todoState.updateTodoStatus === "rejected" ? (
            <Alert severity="error">{todoState.updateTodoError}</Alert>
          ) : null
        }
        {
          todoState.updateTodoStatus === "success" ? (
            <Alert severity="success">Task Updated...</Alert>
          ) : null
        }
         {
          todoState.deleteTodoStatus === "rejected" ? (
            <Alert severity="error">{todoState.deleteTodoError}</Alert>
          ) : null
        }
        {
          todoState.deleteTodoStatus === "success" ? (
            <Alert severity="warning">Task is Deleted</Alert>
          ) : null
        }
      </form>
    </>
  );
};

export default AddTodo;
