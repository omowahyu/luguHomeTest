import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

// Get single user
export const getUser = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Create user
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};

// Update user
export const updateUser = async (
  id: number,
  user: Partial<User>,
): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

// Delete user
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
