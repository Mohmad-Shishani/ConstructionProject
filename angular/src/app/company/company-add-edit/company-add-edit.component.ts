import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/project/project.service';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { Project } from 'src/app/shared/models/Project';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-add-edit',
  templateUrl: './company-add-edit.component.html',
  styleUrls: ['./company-add-edit.component.css']
})
export class CompanyAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  companyId = 0;
  pageMode: PageMode = PageMode.Add;

  projectsList!: Project[];

  
  companyForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    rating: [''],
    projects: ['']
  });

  constructor(
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

    if(this.companyForm.valid){

      if(this.pageMode == PageMode.Add){
        
        this.companySvc.createCompany(this.companyForm.value).subscribe(

          res =>{
            this.snackBar.open("Added a New Company successfully");
            this.router.navigate(["/companies"]);
          },
          
          // err => {
          //     this.snackBar.open("Couldn't Add a New Company");
          // }
        );
      }
      else{

        this.companySvc.editCompany(this.companyForm.value).subscribe(

          res =>{
            this.snackBar.open("Edited Company Successfully");
            this.router.navigate(["/companies"]);
          },
          // err =>{
          //   this.snackBar.open("Couldn't Edit The Company");
          // }
        );
      }
    }
  }


  compareProjects(pro1: Project, pro2: Project): boolean {
    return pro1 && pro2? pro1.id === pro2.id: pro1 === pro2;
  }


  private setPageMode() {
    if (this.route.snapshot.paramMap.get('id')){

      this.companyId = Number(this.route.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }
  }

  private enterEditPageMode() {

    this.companySvc.getCompanyById(this.companyId).subscribe(

      companyFromServer => {

        this.companyForm.patchValue({
          id: companyFromServer.id,
          name: companyFromServer.name,
          rating: companyFromServer.rating,
          projects: companyFromServer.projects,
        });
      }
    );
  }

  private getLists(){
    this.getProjects();
  }


  private getProjects() {
    this.projectSvc.getProjects().subscribe(
      res =>{
        this.projectsList = res;
      }
    );
  }

}
