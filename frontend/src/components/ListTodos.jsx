import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Card, CircularProgress, Button } from "@mui/material";
import "../App.css";
import { deleteTodo, getTodos } from "../store/slices/todoSlice";

//get request
const ListTodos = ({setTodo}) => {

  const dispatch = useDispatch();
  const todosState = useSelector(state => state.todosState);
  const { todos } = todosState;

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (_id) => {
    dispatch(deleteTodo(_id));
  }

  return (
    <div>
      <h2> You have {todos && todos.length} tasks </h2>
      <div>
        {
          todosState.getTodoStatus === "pending" ? <CircularProgress /> : null
        }
        {
          todos.map(todo => (
            <Card
              variant="outlined"
              sx={
                {
                  padding: "0.7rem",
                  marginBottom: "2rem",
                }
              }
              key={todo._id}
            >
              <h3>{todo.task}</h3>
              <p>Added : {moment(todo.date).fromNow()}</p>
              <Button 
              variant="outlined"
              size="small"
              sx={
                {
                  fontFamily : "'Abel','sansSerif",
                }
              }

              onClick={() => setTodo(todo)}
              >
                Update
              </Button>
              <Button 
              variant="contained"
              size="small"
              color="secondary"
              sx={
                {
                  marginLeft : "0.7rem",
                  fontFamily : "'Abel','sansSerif",
                }
              }

              onClick={() => handleDelete(todo._id)}
              >
                Delete
              </Button>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default ListTodos;
