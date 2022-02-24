import { Company } from "./Company";
import { Worker } from "./Worker";

export interface Project {
    id: number;
    name: string
    projectStart: Date;
    projectEnd: Date ;
    income: number;
    workers: Worker[];
    companyId: number;
    company: Company;
}