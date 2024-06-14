import { useParams } from "react-router-dom";
import { Container, Heading, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from local storage or API
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventDetails = events.find((event, index) => index === parseInt(id));
    setEvent(eventDetails);
  }, [id]);

  if (!event) {
    return (
      <Container centerContent>
        <Heading as="h2" size="xl" mt={10}>Event not found</Heading>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={10}>
      <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
        <Heading as="h1" size="xl" mb={4}>{event.name}</Heading>
        <Text fontSize="lg" mb={4}>Date: {event.date}</Text>
        <Text fontSize="md">{event.description || "No description available."}</Text>
      </Box>
    </Container>
  );
};

export default EventDetails;