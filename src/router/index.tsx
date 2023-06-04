/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Home from '@/views/Home';
import Login from '@/views/Login';

export default function RoutesConfig() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);
}
