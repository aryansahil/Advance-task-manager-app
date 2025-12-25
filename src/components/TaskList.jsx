import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Typography } from "@mui/material";

export default function TaskList() {
  const { visibleTasks, allTasks, setAllTasks } = useContext(TaskContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const draggedId = visibleTasks[result.source.index].id;
    const sourceIndex = allTasks.findIndex(t => t.id === draggedId);

    const updated = Array.from(allTasks);
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(result.destination.index, 0, moved);

    setAllTasks(updated);
  };

  return (
    <Box
      sx={{
        flex: 1,              
        overflowY: "auto",    
        pr: 1,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {visibleTasks?.length ? visibleTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: 8,
                      }}
                    >
                      <TaskItem task={task} />
                    </div>
                  )}
                </Draggable>
              )) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  No tasks to display
                </Typography>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
