import { Project } from "./Project";

export interface Company {
    id: number;
    name: string;
    rating: number;
    projects: Project[];
}