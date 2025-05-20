import React from 'react'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useTaskBoard } from '../board/task.js'
import TaskCard from '../components/TaskCard.jsx'


const HomePage = () => {
  const { fetchTasks, tasks } = useTaskBoard()

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  console.log("tasks", tasks);

  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text 
          fontSize={"3xl"} // Increased font size
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Task Board 📋
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }} // Responsive grid
          spacing={10}
          w={"full"}
        >
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </SimpleGrid>

        {tasks.length === 0 && (
          <Text fontSize='xl' textAlign='center' fontWeight='bold' color='gray.500'>
          No tasks yet 🚀{" "}
          <Link to={"/create"}>
            <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
              Create a task
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage
