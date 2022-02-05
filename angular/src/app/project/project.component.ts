import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../shared/models/Project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects!: Project[];

  constructor(
    private projectSvc: ProjectService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void{

    this.projectSvc.getProjects().subscribe(
      projects => {
        this.projects = projects;
      },
    );
  }
}
