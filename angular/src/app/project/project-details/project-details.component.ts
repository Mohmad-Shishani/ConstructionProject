import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/shared/models/Project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project!: Project;

  constructor(private projectSvc: ProjectService,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'))

    this.projectSvc.getProjectById(projectId).subscribe(
      project => {
        this.project = project;
      }
    );
  }

}
