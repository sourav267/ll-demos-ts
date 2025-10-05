# BookMyShow System - Design Patterns & Architecture

## Overview

This is a TypeScript implementation of a movie ticket booking system similar to BookMyShow. The system demonstrates various design patterns and architectural principles for building scalable, maintainable applications.

## System Architecture

### Core Components

The system is organized into several key components:

1. **Entities** - Core domain objects representing business entities
2. **Services** - Business logic and operations
3. **Enums** - Type-safe constants and status definitions
4. **Main System** - Orchestrates all components

### Entity Structure

```
├── entities/
│   ├── movies.ts          # Movie entity with metadata
│   ├── person.ts          # Person, Customer, Admin classes
│   ├── booking.ts         # Booking management
│   ├── theater.ts         # Theater and screen management
│   ├── show.ts            # Show scheduling
│   ├── seat.ts            # Seat management and status
│   ├── screen.ts          # Screen configuration
│   └── payment.ts         # Payment processing
├── service/
│   └── booking.ts         # Booking service logic
├── enums/
│   └── enum.ts           # All system enums
└── index.ts              # Main system orchestrator
```

## Design Patterns Implemented

### 1. **Domain-Driven Design (DDD)**
The system follows DDD principles with clear separation of concerns:

- **Entities**: Core business objects (Movie, Customer, Booking, etc.)
- **Value Objects**: Immutable objects like Seat, Payment
- **Aggregates**: Booking aggregates Customer, Show, and Seats
- **Services**: Domain services for complex business logic

### 2. **Repository Pattern**
```typescript
// Implicit repository pattern in BookMyShowSystem
private customers: Map<string, Customer>;
private admins: Map<string, Admin>;
private movies: Movie[];
private theaters: Theater[];
```

**Benefits:**
- Centralized data access
- Easy to swap data sources
- Clear separation of data access logic

### 3. **Service Layer Pattern**
```typescript
class BookingService {
  private activeBookings: Map<string, Booking>;
  
  createBooking(customer: Customer, show: Show, seatIds: string[]): Booking | null
  confirmBooking(bookingId: string, paymentMethod: PaymentMethod): boolean
  cancelBooking(bookingId: string): boolean
}
```

**Benefits:**
- Encapsulates business logic
- Reusable across different controllers
- Easy to test and maintain

### 4. **State Pattern**
```typescript
enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  RESERVED = 'RESERVED'
}

enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}
```

**Implementation:**
- Seats transition through states: Available → Reserved → Booked
- Bookings have lifecycle: Pending → Confirmed/Cancelled
- Clear state transitions with validation

### 5. **Factory Pattern (Implicit)**
```typescript
// Entity creation methods
registerCustomer(id: string, name: string, email: string, phone: string): Customer
registerAdmin(id: string, name: string, email: string, phone: string): Admin
addMovie(movie: Movie): void
```

**Benefits:**
- Centralized object creation
- Consistent object initialization
- Easy to modify creation logic

### 6. **Observer Pattern (Implicit)**
```typescript
// Automatic expiration checking
private startExpirationChecker(): void {
  setInterval(() => {
    this.activeBookings.forEach((booking, bookingId) => {
      if (booking.isExpired()) {
        booking.cancelBooking();
        expiredBookings.push(bookingId);
      }
    });
  }, 60000);
}
```

**Benefits:**
- Automatic cleanup of expired bookings
- Decoupled expiration logic
- Scalable monitoring system

### 7. **Template Method Pattern**
```typescript
// Booking lifecycle with consistent steps
reserveSeats(): boolean {
  // 1. Try to reserve all seats atomically
  // 2. Rollback on failure
  // 3. Return success/failure
}

confirmBooking(payment: Payment): boolean {
  // 1. Process payment
  // 2. Update booking status
  // 3. Book seats
  // 4. Add to customer
}
```

### 8. **Strategy Pattern (Payment Methods)**
```typescript
enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  NET_BANKING = 'NET_BANKING',
  WALLET = 'WALLET'
}
```

**Benefits:**
- Easy to add new payment methods
- Consistent payment processing interface
- Flexible payment strategy selection

### 9. **Composition Pattern**
```typescript
class Theater {
  private screens: Map<string, Screen>;
}

class Screen {
  private seats: Map<string, Seat>;
}

class Booking {
  private customer: Customer;
  private show: Show;
  private seats: Seat[];
}
```

**Benefits:**
- Hierarchical object relationships
- Easy to navigate object graphs
- Clear ownership and containment

### 10. **Command Pattern (Implicit)**
```typescript
// Booking operations as commands
bookTickets(customerId: string, showId: string, seatIds: string[]): Booking | null
confirmBooking(bookingId: string, paymentMethod: PaymentMethod): boolean
cancelBooking(bookingId: string): boolean
```

## Key Features

### 1. **Atomic Operations**
- Seat reservations are atomic (all-or-nothing)
- Automatic rollback on failure
- Consistent state management

### 2. **Concurrency Control**
- Seat status prevents double booking
- Reservation timeout mechanism
- Thread-safe operations

### 3. **Business Rules**
- 15-minute reservation timeout
- Automatic expiration cleanup
- Payment validation before confirmation

### 4. **Error Handling**
- Graceful failure handling
- Automatic cleanup on errors
- Clear error propagation

## Usage Example

```typescript
// Initialize system
const bookMyShow = new BookMyShowSystem();

// Register users
const customer = bookMyShow.registerCustomer("C1", "John Doe", "john@email.com", "1234567890");
const admin = bookMyShow.registerAdmin("A1", "Admin User", "admin@email.com", "0987654321");

// Add content
const movie = new Movie("M1", "Inception", "Sci-fi thriller", 148, Language.ENGLISH, new Date(), [Genre.SCI_FI], ["Leonardo DiCaprio"], "Christopher Nolan", 8.8);
bookMyShow.addMovie(movie);

// Book tickets
const booking = bookMyShow.bookTickets("C1", "SHOW_ID", ["SEAT1", "SEAT2"]);
if (booking) {
  const confirmed = bookMyShow.confirmBooking(booking.getId(), PaymentMethod.CREDIT_CARD);
}
```

## Design Principles Applied

### 1. **Single Responsibility Principle (SRP)**
- Each class has one clear responsibility
- Booking handles booking logic
- Payment handles payment processing
- Seat manages seat state

### 2. **Open/Closed Principle (OCP)**
- Easy to extend with new payment methods
- New seat types can be added
- New booking statuses supported

### 3. **Liskov Substitution Principle (LSP)**
- Customer and Admin can substitute Person
- Polymorphic behavior maintained

### 4. **Interface Segregation Principle (ISP)**
- Focused interfaces for different concerns
- No unnecessary dependencies

### 5. **Dependency Inversion Principle (DIP)**
- High-level modules don't depend on low-level modules
- Abstractions used for loose coupling

## Scalability Considerations

### 1. **Database Integration**
- Current in-memory storage can be replaced with database
- Repository pattern enables easy data source switching

### 2. **Caching Strategy**
- Seat availability can be cached
- Movie and theater data can be cached

### 3. **Microservices Architecture**
- Booking service can be separate microservice
- Payment service can be independent
- Search service can be separate

### 4. **Event-Driven Architecture**
- Booking events can trigger notifications
- Payment events can trigger confirmations
- Seat booking events can update availability

## Testing Strategy

### 1. **Unit Testing**
- Test individual entity methods
- Test service layer logic
- Mock external dependencies

### 2. **Integration Testing**
- Test booking flow end-to-end
- Test payment integration
- Test seat reservation logic

### 3. **Performance Testing**
- Test concurrent booking scenarios
- Test system under load
- Test timeout mechanisms

## Future Enhancements

### 1. **Additional Patterns**
- **Builder Pattern**: For complex object creation
- **Decorator Pattern**: For seat pricing strategies
- **Chain of Responsibility**: For booking validation
- **Mediator Pattern**: For system coordination

### 2. **Advanced Features**
- Real-time seat availability updates
- Recommendation engine
- Dynamic pricing
- Multi-language support
- Mobile app integration

## Conclusion

This BookMyShow implementation demonstrates how design patterns can create a robust, scalable, and maintainable system. The patterns work together to provide:

- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to extend and modify
- **Testability**: Isolated components for testing
- **Reliability**: Atomic operations and error handling
- **Performance**: Efficient data structures and algorithms

The system serves as an excellent example of applying object-oriented design principles and patterns to solve real-world business problems.
