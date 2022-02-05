import { Project } from "./Project";

export interface Company {
    id: number;
    name: string;
    rating: number;
    project: Project[];
}