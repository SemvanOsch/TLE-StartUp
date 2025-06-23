
const API_BASE = import.meta.env.VITE_API_BASE;
const API_URL = 'https://planeetwiskunde-backend.onrender.com/api/game';


// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

//  user API
export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/user/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return res.json();
};
export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return res.json();
};
// coins API
export const getUserCoins = async (id) => {
  const res = await fetch(`${API_URL}/user/${id}/coins`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return res.json();
};

export const updateCoins = async (amount) => {
  const res = await fetch(`${API_URL}/user/update-coins`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) throw new Error("Failed to update coins");

  return res.json();
};



// scores API
export const getUserScores = async (userId) => {
  const res = await fetch(`${API_URL}/scores/${userId}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return res.json();
};

export const saveScore = async (data) => {
  const res = await fetch(`${API_URL}/scores`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};
// rewards API
export const getRewards = async () => {
  const res = await fetch(`${API_URL}/rewards`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return res.json();
};

export const createReward = async (data) => {
  const res = await fetch(`${API_URL}/rewards`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const buyReward = async (userId, rewardId) => {
  const res = await fetch(`${API_URL}/user/${userId}/rewards/${rewardId}`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
};
