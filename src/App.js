import { CssBaseline, Container, Typography, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { TaskProvider, TaskContext } from "./context/TaskContext";
import { getTheme } from "./theme";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import { useContext, useEffect } from "react";

function AppContent() {
  const { mode } = useContext(TaskContext);

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="app-shell">
          <Stack direction={"row"} justifyContent="space-between" alignItems="center" mb={1}>
            <Typography sx={{
              fontWeight: "bold"
            }}>Task Manager</Typography>
            <ThemeToggle />
          </Stack>
          <TaskInput />
          <FilterBar />
          <TaskList />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}
