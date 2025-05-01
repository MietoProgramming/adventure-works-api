# Airlines API

This project implements an API for an airline booking system using four different protocols:

- REST API
- GraphQL API
- gRPC API
- WebSocket API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL database with the airline booking schema loaded
- Yarn package manager
- Download and unpack database from the [link](https://edu.postgrespro.com/demo-big-en.zip)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Apply the command from the root folder of the project and use default `password` as password:

```
psql -h localhost -U admin -d demo -f demo-big-en-20170815.sql
```

4. Create a `.env` file in the root directory and add your database connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/demo?schema=bookings"
```

5. Start the application:

```bash
yarn start:dev
```

6. Connect

```
Application is running on: http://[::1]:3000
REST API documentation available at: http://[::1]:3000/api-docs
GraphQL playground available at: http://[::1]:3000/graphql
gRPC API available at: localhost:5000
WebSocket API available at: ws://[::1]:3000
```

## API Protocols

The API is accessible via four different protocols, all running simultaneously on the same server.

### 1. REST API

A traditional REST API with the following endpoints:

- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get a specific flight by ID
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:bookRef` - Get a specific booking by reference
- `GET /api/aircrafts` - Get all aircrafts
- `GET /api/aircrafts/:code` - Get a specific aircraft by code
- `GET /api/airports` - Get all airports
- `GET /api/airports/:code` - Get a specific airport by code
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:ticketNo` - Get a specific ticket by number
- `GET /api/ticket-flights` - Get all ticket flights
- `GET /api/ticket-flights/:ticketNo/:flightId` - Get a specific ticket flight

**Swagger Documentation**

The REST API includes Swagger documentation available at `/api-docs`.

### 2. GraphQL API

A GraphQL API that allows flexible querying of the airline booking data.

**GraphQL Playground**

The GraphQL playground is available at `/graphql` for interactive exploration of the API.

Example queries:

```graphql
# Get all flights
query {
  flights {
    flight_id
    flight_no
    departure_airport
    arrival_airport
    scheduled_departure
    scheduled_arrival
    status
  }
}

# Get a specific flight with details
query {
  flight(id: 1) {
    flight_id
    flight_no
    departure_airport
    arrival_airport
    status
    departureAirport {
      airport_name
      city
    }
    arrivalAirport {
      airport_name
      city
    }
    aircraft {
      model
      range
    }
  }
}
```

### 3. gRPC API

A high-performance RPC API using gRPC, ideal for microservices communication and low-latency client-server applications.

**gRPC Services**

The following gRPC services are available:

- `FlightService`: Get flight information and stream real-time flight events

  - `GetAllFlights` - Get all flights
  - `GetFlightById` - Get a specific flight by ID
  - `StreamFlightCreated` - Stream flight creation events
  - `StreamFlightUpdated` - Stream flight update events
  - `StreamFlightStatusChanged` - Stream flight status change events

- `BookingService`: Get booking information and stream booking events

  - `GetAllBookings` - Get all bookings
  - `GetBookingByRef` - Get a specific booking by reference
  - `StreamBookingCreated` - Stream booking creation events
  - `StreamBookingUpdated` - Stream booking update events
  - `StreamBookingCanceled` - Stream booking cancellation events

- `AircraftService`: Get aircraft information

  - `GetAllAircrafts` - Get all aircrafts
  - `GetAircraftByCode` - Get a specific aircraft by code

- `AirportService`: Get airport information

  - `GetAllAirports` - Get all airports
  - `GetAirportByCode` - Get a specific airport by code

- `TicketService`: Get ticket information

  - `GetAllTickets` - Get all tickets
  - `GetTicketByNo` - Get a specific ticket by number

- `TicketFlightService`: Get ticket flight information
  - `GetAllTicketFlights` - Get all ticket flights
  - `GetTicketFlightByTicketAndFlightId` - Get a specific ticket flight by ticket number and flight ID

Proto files for the services are available in the `/src/grpc/proto` directory.

### 4. WebSocket API

A WebSocket API for real-time communication between the server and clients.

**WebSocket Events**

The WebSocket API supports both request-response patterns and event-based communication:

- **Request-Response Operations**:

  - `findAllFlights`, `findFlightById`
  - `findAllBookings`, `findBookingByRef`
  - `findAllAircrafts`, `findAircraftByCode`
  - `findAllAirports`, `findAirportByCode`
  - `findAllTickets`, `findTicketByNo`
  - `findAllTicketFlights`, `findTicketFlightByTicketAndFlightId`

- **Event Subscriptions**:

  - `bookingCreated`, `bookingUpdated` - Booking events
  - `flightStatusChanged` - Flight status change events

- **Room Management**:
  - `joinRoom` - Join a room to receive specific event types
  - `leaveRoom` - Leave a room to stop receiving specific event types

Available rooms:

- `flight-events` - All flight events
- `booking-events` - All booking events
- `flight-status-{flight_id}` - Events for a specific flight

## Project Structure

- `/src/domains` - Domain models, repositories, and services
- `/src/graphql` - GraphQL API implementation
- `/src/rest` - REST API implementation
- `/src/grpc` - gRPC API implementation
- `/src/websocket` - WebSocket API implementation
- `/src/prisma` - Prisma service for database access

## Database Schema

The API uses a PostgreSQL database with an airline booking schema that includes the following entities:

- `aircrafts_data` - Information about aircraft models
- `airports_data` - Information about airports
- `boarding_passes` - Boarding pass information
- `bookings` - Booking information
- `flights` - Flight information
- `seats` - Seat information
- `ticket_flights` - Ticket and flight associations
- `tickets` - Ticket information

## License

This project is licensed under the MIT License.
