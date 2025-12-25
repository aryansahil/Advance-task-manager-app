// src/components/FilterBar.jsx
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Stack, Chip } from "@mui/material";

export default function FilterBar() {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <Stack direction="row" spacing={1} mb={2}>
      {["all", "completed", "pending"].map((f) => (
        <Chip
          key={f}
          label={f.toUpperCase()}
          clickable
          color={filter === f ? "primary" : "default"}
          onClick={() => setFilter(f)}
        />
      ))}
    </Stack>
  );
}
