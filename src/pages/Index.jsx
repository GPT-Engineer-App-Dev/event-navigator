import { useState } from "react";
import { Container, VStack, Heading, Text, Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const addEvent = () => {
    if (eventName && eventDate) {
      setEvents([...events, { name: eventName, date: eventDate }]);
      setEventName("");
      setEventDate("");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={6} w="100%">
        <Heading as="h1" size="xl">Events Management</Heading>
        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>Add New Event</Heading>
          <FormControl id="event-name" mb={4}>
            <FormLabel>Event Name</FormLabel>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" />
          </FormControl>
          <FormControl id="event-date" mb={4}>
            <FormLabel>Event Date</FormLabel>
            <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" onClick={addEvent}>Add Event</Button>
        </Box>
        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>Upcoming Events</Heading>
          {events.length === 0 ? (
            <Text>No events added yet.</Text>
          ) : (
            events.map((event, index) => (
              <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
                <Text fontWeight="bold">{event.name}</Text>
                <Text>{event.date}</Text>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;