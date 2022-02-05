import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkerComponent } from './worker/worker.component';
import { CompanyComponent } from './company/company.component';
import { ToolComponent } from './tool/tool.component';
import { ProjectComponent } from './project/project.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { WorkerAddEditComponent } from './worker/worker-add-edit/worker-add-edit.component';
import { WorkerDetailsComponent } from './worker/worker-details/worker-details.component';
import { WorkerDeleteDialogComponent} from'./worker/worker-delete-dialog/worker-delete-dialog.component';
import { ProjectAddEditComponent } from './project/project-add-edit/project-add-edit.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { ProjectDeleteDialogComponent } from './project/project-delete-dialog/project-delete-dialog.component';
import { CompanyAddEditComponent } from './company/company-add-edit/company-add-edit.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { CompanyDeleteDialogComponent } from './company/company-delete-dialog/company-delete-dialog.component';
import { ToolAddEditComponent } from './tool/tool-add-edit/tool-add-edit.component';
import { ToolDetailsComponent } from './tool/tool-details/tool-details.component';
import { ToolDeleteDialogComponent } from './tool/tool-delete-dialog/tool-delete-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorkerComponent,
    CompanyComponent,
    ToolComponent,
    ProjectComponent,
    HomeComponent,
    WorkerAddEditComponent,
    CompanyAddEditComponent,
    ToolAddEditComponent,
    ProjectAddEditComponent,
    WorkerDetailsComponent,
    CompanyDetailsComponent,
    ProjectDetailsComponent,
    ToolDetailsComponent,
    CompanyDetailsComponent,
    WorkerDeleteDialogComponent,
    ToolDeleteDialogComponent,
    CompanyDeleteDialogComponent,
    ProjectDeleteDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
