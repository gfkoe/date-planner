export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type Date = {
  id: number;
  description: string;
  location: string;
  date: string;
};

export type InsertUser = Omit<User, "id">;
export type InsertDate = Omit<Date, "id">;
