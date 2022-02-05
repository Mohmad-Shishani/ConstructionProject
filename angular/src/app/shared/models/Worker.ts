import { Gender } from "../enums/Gender.enum";
import { Shift } from "../enums/Shift.enum";
import { Project } from "./Project";
import { Tool } from "./Tool";

export interface Worker{
    id: number;
    name: string;
    dateOfBirth: Date;
    gender: Gender;
    shift: Shift;
    payment: boolean;
    tools: Tool[];
    projects: Project[];
}