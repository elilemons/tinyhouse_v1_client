import { ApolloError } from '@apollo/client';
import { Avatar, List, Spin } from 'antd';
import React from 'react';
import { ListingsSkeleton } from '..';
import { Bookings as BookingsData } from '../../__generated__/Bookings';

interface Props {
  bookings: BookingsData['bookings'];
}

export const ListingsBookings = ({ bookings }: Props) => {
  return (
    <div className="listings-section">
      <h2>Your Bookings</h2>
      <List
        itemLayout="horizontal"
        dataSource={bookings}
        renderItem={(booking) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={booking.title}
                description={booking.address}
                avatar={<Avatar src={booking.image} shape="square" size={48} />}
              ></List.Item.Meta>
              <div>{booking.timestamp}</div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
