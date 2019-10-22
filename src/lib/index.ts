import { Command } from 'commander';
import { attachAddAt } from './add';

export const attachAt = (index: Command) => {
  attachAddAt(index);
};
