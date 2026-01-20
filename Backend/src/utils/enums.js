// Booking Status Enum
const bookingStatus = {
    PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED'
}

// User Role Enum
const userRole = {
  CUSTOMER: 'CUSTOMER',
  PROVIDER: 'PROVIDER',
  SYSTEM: 'SYSTEM',
  ADMIN: 'ADMIN'
};

module.exports = {
    bookingStatus,
    userRole
};


