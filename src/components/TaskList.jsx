import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Stack, Typography } from "@mui/material";

export default function TaskList() {
  const { visibleTasks, allTasks, setAllTasks } = useContext(TaskContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const draggedTaskId = visibleTasks[result.source.index].id;
    const sourceIndex = allTasks.findIndex((t) => t.id === draggedTaskId);
    const destinationIndex = result.destination.index;

    const updated = Array.from(allTasks);
    const [removed] = updated.splice(sourceIndex, 1);
    updated.splice(destinationIndex, 0, removed);

    setAllTasks(updated);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={1.2}
            sx={{ minHeight: 20 }}
          >
            {visibleTasks?.length ? visibleTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    <TaskItem task={task} />
                  </div>
                )}
              </Draggable>
            )) : (
              <Typography align="center" sx={{ mt: 4, opacity: 0.6 }}>
                No tasks to show.
              </Typography>
            )}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
