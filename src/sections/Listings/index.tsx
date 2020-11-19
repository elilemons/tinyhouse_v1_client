import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { Bookings as BookingsData } from './__generated__/Bookings';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  CreateBooking as CreateBookingData,
  CreateBookingVariables,
} from './__generated__/CreateBooking';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
import { ListingsList, ListingsSkeleton } from './components';

import './styles/Listings.css';
import { Alert, Spin } from 'antd';
import { ListingsBookings } from './components/ListingsBookings';

const BOOKINGS = gql`
  query Bookings {
    bookings {
      id
      title
      image
      address
      timestamp
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($listingId: ID!, $timestamp: String) {
    createBooking(listingId: $listingId, timestamp: $timestamp) {
      listingId
      timestamp
    }
  }
`;

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export const Listings = () => {
  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
    refetch: bookingsRefetch,
  } = useQuery<BookingsData>(BOOKINGS);

  const {
    data: listingsData,
    loading: listingsLoading,
    error: listingsError,
    refetch: listingsRefetch,
  } = useQuery<ListingsData>(LISTINGS);

  const [
    createBooking,
    { loading: createBookingLoading, error: createBookingError },
  ] = useMutation<CreateBookingData, CreateBookingVariables>(CREATE_BOOKING);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleCreateBooking = async (
    listingId: string,
    timestamp: string = new Date().toDateString()
  ) => {
    await createBooking({
      variables: { listingId, timestamp },
    });
    bookingsRefetch();
    listingsRefetch();
  };

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    listingsRefetch();
  };

  const listings = listingsData ? listingsData.listings : null;
  const listingsList = listings ? (
    <ListingsList
      handleCreateBooking={handleCreateBooking}
      handleDeleteListing={handleDeleteListing}
      listings={listings}
    />
  ) : null;

  const bookings = bookingsData ? bookingsData.bookings : null;
  const listingsBookings = bookings ? (
    <ListingsBookings bookings={bookings} />
  ) : null;

  if (bookingsLoading || listingsLoading) {
    return (
      <div className="app">
        <ListingsSkeleton title="TinyHouse Listings" />
      </div>
    );
  }

  if (bookingsError || listingsError) {
    return (
      <div className="app">
        <ListingsSkeleton title="TinyHouse Listings" error />
      </div>
    );
  }

  const createBookingErrorAlert = createBookingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong while creating a booking. :( Try again later."
      className="listing__alert"
    />
  ) : null;

  const createBookingLoadingMessage = createBookingLoading ? (
    <h4>Booking in progress...</h4>
  ) : null;

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong while deleting a listing. :( Try again later."
      className="listing__alert"
    />
  ) : null;

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  return (
    <div className="app">
      {createBookingErrorAlert}
      {deleteListingErrorAlert}
      <Spin spinning={createBookingLoading || deleteListingLoading}>
        {listingsList}
        {listingsBookings}
        {createBookingLoadingMessage}
        {deleteListingLoadingMessage}
      </Spin>
    </div>
  );
};
