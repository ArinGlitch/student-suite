import { 
  Box, 
  Button,
  Container, 
  useColorModeValue, 
  VStack, 
  Input, 
  Textarea, 
  Select, 
  Heading 
} from '@chakra-ui/react';
import React from 'react'
import { useTaskBoard } from '../board/task.js';
import { useToast } from '@chakra-ui/react';

const CreatePage = () => {
  const [newTask, setNewTask] = React.useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  const toast = useToast();

  const {createTask} = useTaskBoard();

  const handleAddTask = async() => {
    const {success, message} = await createTask(newTask);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
    });
    }
    
  }

  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
    >
      <Heading as ="h1" size="2xl" textAlign={"center"} mb={8}>
        Create new Task
      </Heading>

      <Box
        w={"full"} bg={useColorModeValue('white', 'gray.800')}
        p={6} rounded={"lg"} shadow={"md"}
      >
        <VStack spacing={4}>
          <Input
            placeholder={"Title"}
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <Textarea
            placeholder={"Description"}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <Input
            type={"date"}
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <Select
            placeholder={"Select Priority"}
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>

          <Button colorScheme={"blue"} onClick={handleAddTask} w={"full"}>
            Add Task
          </Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default CreatePage
