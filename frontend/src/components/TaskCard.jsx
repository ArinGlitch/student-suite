import React, { useState } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  HStack, 
  IconButton, 
  useColorModeValue, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Textarea,
  Select,
  Button,
  ModalFooter
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { useTaskBoard } from '../board/task.js';
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const TaskCard = ({ task, setTask, onUpdate }) => {
    const [updatedTask, setUpdatedTask] = useState(task);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteTask, updateTask } = useTaskBoard();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteTask = async (id) => {
        const { success, message } = await deleteTask(id);
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
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        const { success, message } = await updateTask(id, updatedTask);
        onClose();
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
                description: "Task updated successfully",
                status: "success",
                isClosable: true,
            });
        }
    };

    const handleCompleteTask = async (id, currentTask) => {
        const completed = { ...currentTask, status: "Completed" };
        const { success, message } = await updateTask(id, completed);
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
                description: "Task marked as Completed",
                status: "success",
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
            m={2}
        >
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {task.title}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    Priority: {task.priority}
                </Text>

                <Text fontSize="md" color="gray.600" mb={4}>
                    {task.description}
                </Text>

                <Text fontSize="sm" color="gray.500" mb={4}>
                    Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date specified"}
                </Text>

                <Text fontSize="sm" color={textColor} mb={4}>
                    Status: {task.status}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" aria-label="Edit task" />
                    <IconButton 
                      icon={<CheckIcon />} 
                      colorScheme="green" 
                      aria-label="Complete task" 
                      onClick={() => handleCompleteTask(task._id, task)}
                    />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteTask(task._id)} colorScheme="red" aria-label="Delete task" />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Title" name='title'
                                value={updatedTask.title}
                                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                            />
                            <Textarea
                                placeholder="Description" name='description'
                                value={updatedTask.description}
                                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                            />
                            <Input
                                name='dueDate'
                                type="date"
                                placeholder="Due Date"
                                value={updatedTask.dueDate}
                                onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
                            />
                            <Select
                                placeholder="Select Priority" name='priority'
                                value={updatedTask.priority}
                                onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </Select>
                            <Select
                                placeholder="Select Status"
                                value={updatedTask.status}
                                onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </Select>
                        </VStack>
                    </ModalBody>
                    <ModalFooter justifyContent="flex-end">
                        <Button colorScheme="blue" mr={3}
                            onClick={() => handleUpdateTask(task._id, updatedTask)}
                        >
                            Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default TaskCard;
