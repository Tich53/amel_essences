import { Gender } from '../gender';

export interface HydraGender {
  'hydra:member': Gender[];
  'hydra:totalItems': number;
}
