import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponent } from './worker/worker.component';
import { WorkerAddEditComponent } from './worker/worker-add-edit/worker-add-edit.component';
import { WorkerDetailsComponent } from './worker/worker-details/worker-details.component';
import { CompanyAddEditComponent } from './company/company-add-edit/company-add-edit.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectAddEditComponent } from './project/project-add-edit/project-add-edit.component';
import { ToolAddEditComponent } from './tool/tool-add-edit/tool-add-edit.component';
import { ToolDetailsComponent } from './tool/tool-details/tool-details.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { ProjectComponent } from './project/project.component';
import { ToolComponent } from './tool/tool.component';
import { FAQComponent } from './f-a-q/f-a-q.component'

const routes: Routes = [
  {path: 'workers', component: WorkerComponent},
  {path: 'workers/add', component: WorkerAddEditComponent},
  {path: 'workers/edit/:id', component: WorkerAddEditComponent},
  {path: 'workers/:id', component: WorkerDetailsComponent},

  {path: 'companies', component: CompanyComponent},
  {path: 'companies/add', component: CompanyAddEditComponent},
  {path: 'companies/edit/:id', component: CompanyAddEditComponent},
  {path: 'companies/:id', component: CompanyDetailsComponent},

  {path: 'projects', component: ProjectComponent},
  {path: 'projects/add', component: ProjectAddEditComponent},
  {path: 'projects/edit/:id', component: ProjectAddEditComponent},
  {path: 'projects/:id', component: ProjectDetailsComponent},

  {path: 'tools', component: ToolComponent},
  {path: 'tools/add', component: ToolAddEditComponent},
  {path: 'tools/edit/:id', component: ToolAddEditComponent},
  {path: 'tools/:id', component: ToolDetailsComponent},
  
  {path: 'f-a-qs', component: FAQComponent},

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
