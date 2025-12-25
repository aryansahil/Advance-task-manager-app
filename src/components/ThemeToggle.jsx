// src/components/ThemeToggle.jsx
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { IconButton, Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggle() {
  const { mode, setMode } = useContext(TaskContext);

  return (
    <Box textAlign="right" mb={2}>
      <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
}
