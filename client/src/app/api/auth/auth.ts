import { NextApiRequest, NextApiResponse } from 'next';
import { apiRequest } from '../api';
export async function updatePassword(currentPassword: string, newPassword: string) {
  try {
    // Make the API request using the apiRequest utility
    const response = await apiRequest(
      {} as NextApiRequest,
      {} as NextApiResponse,
      '/api/v1/merchant/update-password', // Endpoint
      'PUT', // HTTP method
      { currentPassword, newPassword } // Request body data
    );

    // Handle the response
    if (response.status === 200) {
      return { message: 'Password updated successfully' };
    } else {
      return { message: response.message || 'An error occurred during the password update' };
    }
  } catch (error: any) {
    console.error('Error during password update:', error);
    return { message: error.message || 'An error occurred during the password update' };
  }
}
