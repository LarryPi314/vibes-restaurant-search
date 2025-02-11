"use client";
import { useEffect, useState } from 'react';
interface RestaurantMatchDetailsProps {
    restaurantName: string;
    matchDetails: string;
  }
  export default function RestaurantMatchDetails({ restaurantName, matchDetails }: RestaurantMatchDetailsProps) {
    return (
      <p className="text-lg mt-2">
        {restaurantName}: {matchDetails}
      </p>
    );
  }