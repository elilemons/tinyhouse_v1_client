/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBooking
// ====================================================

export interface CreateBooking_createBooking {
  __typename: "Booking";
  listingId: string;
  timestamp: string;
}

export interface CreateBooking {
  createBooking: CreateBooking_createBooking;
}

export interface CreateBookingVariables {
  listingId: string;
  timestamp?: string | null;
}
