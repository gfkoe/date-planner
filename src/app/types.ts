export type Dino = { name: string; description: string };

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
  date: Date;
};
