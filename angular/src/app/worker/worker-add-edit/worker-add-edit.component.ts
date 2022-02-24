import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/project/project.service';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { Project } from 'src/app/shared/models/Project';
import { Tool } from 'src/app/shared/models/Tool';
import { ToolService } from 'src/app/tool/tool.service';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-add-edit',
  templateUrl: './worker-add-edit.component.html',
  styleUrls: ['./worker-add-edit.component.css']
})
export class WorkerAddEditComponent implements OnInit {

  pageModeEnum = PageMode;
  pageMode: PageMode = PageMode.Add;

  workerId = 0;

  toolsList!: Tool[];
  projectsList!: Project[];


  workerForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    shift: ['', Validators.required],
    payment: [false],
    paymentDate: [''],
    tools: [''],
    projects: ['']
  });

  
  constructor(
    private toolSvc: ToolService,
    private projectSvc: ProjectService,
    private route: ActivatedRoute,
    private workerSvc: WorkerService,
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

    if(this.workerForm.valid){

      if(this.pageMode == PageMode.Add){
        
        this.workerSvc.createWorker(this.workerForm.value).subscribe(

          res =>{
            this.snackBar.open("Added a New Worker successfully");
            this.router.navigate(["/workers"]);
          },
          
          err => {
              this.snackBar.open("Couldn't Add a New Worker");
          }
        );
      }
      else{

        this.workerSvc.editWorker(this.workerForm.value).subscribe(

          res =>{
            this.snackBar.open("Edited Worker Successfully");
            this.router.navigate(["/workers"]);
          },
          err =>{
            this.snackBar.open("Couldn't Edit The Worker");
          }
        );
      }
    }
  }


  compareTools(tool1: Tool, tool2: Tool): boolean {
    return tool1 && tool2 ? tool1.id === tool2.id: tool1 === tool2;
  }

  compareProjects(pro1: Project, pro2: Project): boolean {
    return pro1 && pro2 ? pro1.id === pro2.id: pro1 === pro2;
  }


  private setPageMode() {
    if (this.route.snapshot.paramMap.get('id')){

      this.workerId = Number(this.route.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }
  }


    
 private enterEditPageMode() {

    this.workerSvc.getWorkerById(this.workerId).subscribe(

      workerFromServer => {

        this.workerForm.patchValue({
          id: workerFromServer.id,
          name: workerFromServer.name,
          dateOfBirth: workerFromServer.dateOfBirth,
          gender: workerFromServer.gender,
          shift: workerFromServer.shift,
          payment: workerFromServer.payment,
          paymentDate: workerFromServer.paymentDate,
          tools: workerFromServer.tools,
          projects: workerFromServer.projects,
        });
      }
    );
  }



  private getLists()  {
    this.getTools();
    this.getProjects();
  }

  private getTools() {
    this.toolSvc.getTools().subscribe(
      res => {
        this.toolsList = res;
      }
    );
  }

  private getProjects() {
    this.projectSvc.getProjects().subscribe(
      res => {
        this.projectsList = res;
      }
    );
  }

}
