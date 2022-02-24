import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { WorkerService } from 'src/app/worker/worker.service';
import { ProjectService } from '../project.service';
import { Worker } from 'src/app/shared/models/Worker';
import { Company } from 'src/app/shared/models/Company';
import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css']
})
export class ProjectAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  projectId = 0;  
  pageMode: PageMode = PageMode.Add;

  companiesList!: Company[];
  workersList!: Worker[];

  projectForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    projectStart: ['', Validators.required],
    projectEnd: ['', Validators.required],
    income: ['', Validators.required],
    companyId: [''],
    workers: ['']
  });

  
  constructor(
    private workerSvc: WorkerService,
    private companySvc: CompanyService,
    private projectSvc: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {

    this.setPageMode();
      
    if(this.pageMode == PageMode.Edit){
      this.enterEditPageMode();
    }
    this.getLists();
  }

  submitForm(): void{

    if(this.projectForm.valid){

      if(this.pageMode == PageMode.Add){
        
        this.projectSvc.createProject(this.projectForm.value).subscribe(

          res =>{
            this.snackBar.open("Added a New Project successfully");
            this.router.navigate(["/projects"]);
          },
          
          // err => {
          //     this.snackBar.open("Couldn't Add a New Project");
          // }
        );
      }
      else{

        this.projectSvc.editProject(this.projectForm.value).subscribe(

          res =>{
            this.snackBar.open("Edited Project Successfully");
            this.router.navigate(["/projects"]);
          },
          // err =>{
          //   this.snackBar.open("Couldn't Edit The Project");
          // }
        );
      }
    }
  }

  compareWorkers(work1: Worker, work2: Worker): boolean {
    return work1 && work2? work1.id === work2.id: work1 === work2;
  }

  private setPageMode() {
    if (this.route.snapshot.paramMap.get('id')){

      this.projectId = Number(this.route.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }
  }

  

  private enterEditPageMode() {

    this.projectSvc.getProjectById(this.projectId).subscribe(

      projectFromServer => {

        this.projectForm.patchValue({
          id: projectFromServer.id,
          name: projectFromServer.name,
          projectStart: projectFromServer.projectStart,
          projectEnd: projectFromServer.projectEnd,
          income: projectFromServer.income,
          companyId: projectFromServer.companyId,
          workers: projectFromServer.workers,
        });
      }
    );
  }

private getLists(){
  this.getCompanies();
  this.getWorkers();
}
  getCompanies() {
    this.companySvc.getCompanies().subscribe(
      companiesFromServer => {
        this.companiesList = companiesFromServer;
      }
    );
  }

  private getWorkers() {
    this.workerSvc.getWorkers().subscribe(
      res =>{
        this.workersList = res;
      }
    );
  }



}
