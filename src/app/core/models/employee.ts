import { Wages } from './wages';
import { User } from './user';
export interface Employee {
  id?: number;
  dpi: string;
  fullName: string;
  baseSalary: number;
  decreeBond: number;
  userId: number;
  createdAt?: Date;
  wages: Wages[];
  user?: any;
  sons: number;
}
