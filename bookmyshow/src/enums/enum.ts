// Enums
enum Genre {
  ACTION = 'ACTION',
  COMEDY = 'COMEDY',
  DRAMA = 'DRAMA',
  THRILLER = 'THRILLER',
  HORROR = 'HORROR',
  ROMANCE = 'ROMANCE',
  SCI_FI = 'SCI_FI',
  DOCUMENTARY = 'DOCUMENTARY'
}

enum Language {
  ENGLISH = 'ENGLISH',
  HINDI = 'HINDI',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  GERMAN = 'GERMAN',
  CHINESE = 'CHINESE',
  JAPANESE = 'JAPANESE'
}

enum SeatType {
  REGULAR = 'REGULAR',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP',
  RECLINER = 'RECLINER'
}

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

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  UPI = 'UPI',
  NET_BANKING = 'NET_BANKING',
  WALLET = 'WALLET'
}

export{
  Genre,
  Language,
  SeatType,
  SeatStatus,
  BookingStatus,
  PaymentStatus,
  PaymentMethod
}