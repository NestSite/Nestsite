import { NextApiRequest, NextApiResponse } from 'next';
import { apiRequest } from '../api';

export async function getTotalMerchants() {
  return apiRequest({} as NextApiRequest, {} as NextApiResponse, '/api/v1/admin/total-merchants', 'GET');
}

export async function getTotalBookings() {
  return apiRequest({} as NextApiRequest, {} as NextApiResponse, '/api/v1/admin/total-bookings', 'GET');
}

export async function getTotalCommunities() {
  return apiRequest({} as NextApiRequest, {} as NextApiResponse, '/api/v1/admin/total-communities', 'GET');
}