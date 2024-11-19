// authService.js

import axios from 'axios'; // Assuming you're using Axios for making HTTP requests

const signing = async (username, password) => {
  try {
    const response = await axios.post('/api/auth/signin', { username, password });
    const { token, isAdmin } = response.data; // Assuming 'isAdmin' is returned by the backend
    return { token, isAdmin };
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default { signing };
