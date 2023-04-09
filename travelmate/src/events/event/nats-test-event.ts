import { Subjects } from '../subject';

export interface  NatTestEvent {
  subject: Subjects.NatTest;
  data: {
    id: string;
    name: string;
  };
}
