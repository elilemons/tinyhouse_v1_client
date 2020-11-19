/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Bookings
// ====================================================

export interface Bookings_bookings {
  __typename: "Booking";
  id: string;
  listingId: string;
  title: string | null;
  image: string | null;
  address: string | null;
  timestamp: string;
}

export interface Bookings {
  bookings: Bookings_bookings[];
}
