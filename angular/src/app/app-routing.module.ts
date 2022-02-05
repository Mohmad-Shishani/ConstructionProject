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

const routes: Routes = [
  {path: 'worker', component: WorkerComponent},
  {path: 'workers/add', component: WorkerAddEditComponent},
  {path: 'workers/edit/:id', component: WorkerAddEditComponent},
  {path: 'worker/:id', component: WorkerDetailsComponent},

  {path: 'company', component: CompanyComponent},
  {path: 'companies/add', component: CompanyAddEditComponent},
  {path: 'companies/edit/:id', component: CompanyAddEditComponent},
  {path: 'company/:id', component: CompanyDetailsComponent},

  {path: 'project', component: ProjectComponent},
  {path: 'projects/add', component: ProjectAddEditComponent},
  {path: 'projects/edit/:id', component: ProjectAddEditComponent},
  {path: 'project/:id', component: ProjectDetailsComponent},

  {path: 'tool', component: ToolComponent},
  {path: 'tools/add', component: ToolAddEditComponent},
  {path: 'tools/edit/:id', component: ToolAddEditComponent},
  {path: 'tool/:id', component: ToolDetailsComponent},
  
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
