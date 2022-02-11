import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../shared/models/Project';
import { ProjectDeleteDialogComponent } from './project-delete-dialog/project-delete-dialog.component';
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


  deleteProject(id: number): void {

    const dialogRef = this.dialog.open(ProjectDeleteDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.projectSvc.deleteProject(id).subscribe(
          res => {
            this.snackBar.open("Project has been deleted successfully");
            this.getProjects();
          },
            // err => {
            //   this.snackBar.open("INTERNAL SERVER ERROR 500");
            // }
        );

      }
    });
  }

  private getProjects(): void{

    this.projectSvc.getProjects().subscribe(
      projects => {
        this.projects = projects;
      },
    );
  }
  
}
