import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TaskInput() {
  const { addTask } = useContext(TaskContext);
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    addTask(text);
    setText("");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2.2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        size="medium"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          flexGrow: 1,
        }}
      />
      <IconButton
        color="primary"
        onClick={submit}
        sx={{
          height: 48,
          width: 48,
        }}
      >
        <AddIcon />
      </IconButton>
    </Paper>
  );
}
