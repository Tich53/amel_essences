import { Gender } from '../gender';

export interface HydraGender {
  'hydra:member': Gender[];
  hydraTotalItems: number;
}
