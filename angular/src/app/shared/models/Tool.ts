import { Worker } from "./Worker";
export interface Tool {
    id: number;
    name: string;
    workerId?: number;
    worker: Worker

}