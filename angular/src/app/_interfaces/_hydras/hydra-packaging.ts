import { Packaging } from '../packaging';

export interface HydraPackaging {
  'hydra:member': Packaging[];
  hydraTotalItems: number;
}
