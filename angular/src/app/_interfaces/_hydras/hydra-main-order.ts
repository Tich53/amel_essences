import { MainOrder } from "../main-order";

export interface HydraMainOrder {
    'hydra:member': MainOrder[];
    'hydra:totalItems': number;
}
