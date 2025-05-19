import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  HStack, 
  IconButton, 
  useColorModeValue 
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';

const TaskCard = ({task}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {task.title}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    {task.priority}
                </Text>

                <Text fontSize="md" color="gray.600" mb={4}>
                    {task.description}
                </Text>

                <Text fontSize="sm" color="gray.500" mb={4}>
                    Due Date: {task.dueDate}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme="blue" />
                    <IconButton icon={<CheckIcon />} colorScheme="green" />
                    <IconButton icon={<DeleteIcon />} colorScheme="red" />
                </HStack>
            </Box>
        </Box>
)
}

export default TaskCard
