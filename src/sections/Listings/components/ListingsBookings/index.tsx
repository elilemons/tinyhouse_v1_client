import { gql, useMutation, useQuery } from '@apollo/client';
import { Alert, Avatar, Button, List, Spin } from 'antd';
import React from 'react';
import { Bookings as BookingsData } from '../../__generated__/Bookings';
import {
  DeleteBooking as DeleteBookingData,
  DeleteBookingVariables,
} from '../../__generated__/DeleteBooking';
import { ListingsSkeleton } from '../ListingsSkeleton';

const BOOKINGS = gql`
  query Bookings {
    bookings {
      id
      listingId
      title
      image
      address
      timestamp
    }
  }
`;

const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      id
      listingId
      title
    }
  }
`;

export const ListingsBookings = () => {
  const {
    data: bookingsData,
    loading: bookingsLoading,
    error: bookingsError,
    refetch: bookingsRefetch,
  } = useQuery<BookingsData>(BOOKINGS);

  const [
    deleteBooking,
    { loading: deleteBookingLoading, error: deleteBookingError },
  ] = useMutation<DeleteBookingData, DeleteBookingVariables>(DELETE_BOOKING);

  const handleDeleteBooking = async (id: string) => {
    await deleteBooking({ variables: { id } });
    bookingsRefetch();
  };

  const deleteBookingErrorAlert = deleteBookingError ? (
    <Alert
      type="error"
      message="Uh oh! Something went wrong while deleting a listing. :( Try again later."
      className="listing__alert"
    />
  ) : null;

  if (bookingsLoading) {
    return <ListingsSkeleton title="Your Bookings" />;
  }

  if (!bookingsData || bookingsError) {
    return (
      <div className="app">
        <ListingsSkeleton title="Your Bookings" error />
      </div>
    );
  }

  return (
    <Spin spinning={bookingsLoading || deleteBookingLoading}>
      <div className="listings-section">
        <h2>Your Bookings</h2>
        {deleteBookingErrorAlert}
        <List
          itemLayout="horizontal"
          dataSource={bookingsData.bookings}
          renderItem={(booking) => {
            return (
              <List.Item
                actions={[
                  <Button
                    type="default"
                    onClick={() => handleDeleteBooking(booking.id)}
                    danger
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={booking.title}
                  description={booking.address}
                  avatar={
                    <Avatar src={booking.image} shape="square" size={48} />
                  }
                ></List.Item.Meta>
                <div>{booking.timestamp}</div>
              </List.Item>
            );
          }}
        />
      </div>
    </Spin>
  );
};
