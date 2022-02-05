import { Company } from "./Company";


export interface Project {
    id: number;
    name: string
    projectStart: Date;
    projectEnd: Date ;
    income: number;
    worker: Worker[];
    company: Company;
}