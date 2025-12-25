import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TaskInput() {
  const { addTask } = useContext(TaskContext);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!text.trim()) {
      setError("Please add something");
      return;
    }

    addTask(text.trim());
    setText("");
    setError("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (error) setError("");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2.2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 1,
      }}
    >
      <TextField
        fullWidth
        size="medium"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error}
      />

      <IconButton
        color="primary"
        onClick={submit}
        sx={{
          height: 48,
          width: 48,
          alignSelf: "flex-start",
        }}
      >
        <AddIcon />
      </IconButton>
    </Paper>
  );
}
