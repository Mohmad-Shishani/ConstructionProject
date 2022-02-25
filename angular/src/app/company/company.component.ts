import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from '../shared/models/Company';
import { CompanyDeleteDialogComponent } from './company-delete-dialog/company-delete-dialog.component';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies!: Company[];

  showSpinner: boolean = true

  constructor(
    private companySvc: CompanyService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }


  deleteCompany(id: number): void {

    const dialogRef = this.dialog.open(CompanyDeleteDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.companySvc.deleteCompany(id).subscribe(
          res => {
            this.snackBar.open("Company has been deleted successfully");
            this.getCompanies();
          },
            err => {
              this.snackBar.open("You Can't Delete This Company it still has unfinished projects. YOU CAN'T AVOID TAXES");
            }
        );

      }
    });
  }




  private getCompanies(): void{

    this.companySvc.getCompanies().subscribe(
      companies => {
        this.companies = companies;
        this.showSpinner = false;
      },
    );
  }
}
