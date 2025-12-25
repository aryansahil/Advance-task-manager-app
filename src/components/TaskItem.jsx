import { memo, useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Typography,
  Stack,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useContext(TaskContext);
  const [visible, setVisible] = useState(true);

  const handleDelete = () => {
    setVisible(false);
    setTimeout(() => deleteTask(task.id), 300);
  };

  return (
    <Collapse in={visible} timeout={300}>
      <Card
        className="task-enter"
        sx={{
          width: "100%",
          cursor: "grab",
          transition: "all 0.25s ease",
          "&:active": { cursor: "grabbing" },
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <Typography
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                {task.text}
              </Typography>
            </Stack>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </Collapse>
  );
}

export default memo(TaskItem);
