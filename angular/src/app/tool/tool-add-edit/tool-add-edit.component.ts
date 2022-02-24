import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from 'src/app/worker/worker.service';
import { Worker } from 'src/app/shared/models/Worker';
import { ToolService } from '../tool.service';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';


@Component({
  selector: 'app-tool-add-edit',
  templateUrl: './tool-add-edit.component.html',
  styleUrls: ['./tool-add-edit.component.css']
})
export class ToolAddEditComponent implements OnInit {

  pageModeEnum = PageMode;
  pageMode: PageMode = PageMode.Add;

  toolId = 0;

  workersList! : Worker[];


  toolForm = this.fb.group({
    id: [0],
    name:['', Validators.required],
    workerId:['']
  });


  constructor(
   private toolSvc : ToolService,
   private workerSvc : WorkerService,
   private route : ActivatedRoute,
   private fb : FormBuilder,
   private router : Router,
   private snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if(this.pageMode == PageMode.Edit){
      this.enterEditPageMode();
    }
    this.getLists();
}

  submitForm(): void{

    if(this.toolForm.valid){

      if(this.pageMode == PageMode.Add){

        this.toolSvc.createTool(this.toolForm.value).subscribe(

          res =>{
            this.snackBar.open("Added a New Tool FINALLY");
            this.router.navigate(["/tools"]);
          }
        );
      }
      else{

        this.toolSvc.editTool(this.toolForm.value).subscribe(
          res =>{
            this.snackBar.open("Edited a New Tool FINALLY");
            this.router.navigate(["/tools"]);
          }
        );
      }
    }
  }

  private setPageMode() {
    if (this.route.snapshot.paramMap.get('id')){

      this.toolId = Number(this.route.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }
  }

  private enterEditPageMode() {

    this.toolSvc.getToolById(this.toolId).subscribe(
      
      toolFromServer => {
        
        this.toolForm.patchValue({
          id: toolFromServer.id,
          name: toolFromServer.name,
          workerId: toolFromServer.workerId
        });
      }
    );
  }

  private getLists(){
    this.getWorkers();  
  }
  getWorkers(){
    this.workerSvc.getWorkers().subscribe(
      workerFromServer => {
        this.workersList = workerFromServer;
      }
    )
  }




}