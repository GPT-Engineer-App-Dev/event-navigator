import { useState } from "react";
import { Container, VStack, Heading, Text, Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const { session } = useSupabaseAuth();
  const { data: events, isLoading, isError } = useEvents();
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const addEvent = () => {
    if (eventName && eventDate) {
      if (editingEvent) {
        updateEventMutation.mutate({ id: editingEvent.id, name: eventName, date: eventDate });
        setEditingEvent(null);
      } else {
        addEventMutation.mutate({ name: eventName, date: eventDate });
      }
      setEventName("");
      setEventDate("");
    }
  };

  const editEvent = (event) => {
    setEventName(event.name);
    setEventDate(event.date);
    setEditingEvent(event);
  };

  const deleteEvent = (id) => {
    deleteEventMutation.mutate(id);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading events.</Text>;
  }

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={6} w="100%">
        <Heading as="h1" size="xl">Events Management</Heading>
        {session && (
          <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Heading as="h2" size="md" mb={4}>{editingEvent ? "Edit Event" : "Add New Event"}</Heading>
            <FormControl id="event-name" mb={4}>
              <FormLabel>Event Name</FormLabel>
              <Input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" />
            </FormControl>
            <FormControl id="event-date" mb={4}>
              <FormLabel>Event Date</FormLabel>
              <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" onClick={addEvent}>{editingEvent ? "Update Event" : "Add Event"}</Button>
          </Box>
        )}
        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <Heading as="h2" size="md" mb={4}>Upcoming Events</Heading>
          {events.length === 0 ? (
            <Text>No events added yet.</Text>
          ) : (
            events.map((event) => (
              <Box key={event.id} p={2} borderWidth={1} borderRadius="md" mb={2}>
                <Link to={`/event/${event.id}`}>
                  <Text fontWeight="bold">{event.name}</Text>
                </Link>
                <Text>{event.date}</Text>
                {session && (
                  <>
                    <Button size="sm" colorScheme="yellow" onClick={() => editEvent(event)}>Edit</Button>
                    <Button size="sm" colorScheme="red" onClick={() => deleteEvent(event.id)}>Delete</Button>
                  </>
                )}
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;