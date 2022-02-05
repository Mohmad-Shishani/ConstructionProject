import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from '../shared/models/Company';
import { Project } from '../shared/models/Project';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies!: Company[];

  constructor(
    private companySvc: CompanyService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies(): void{

    this.companySvc.getCompanies().subscribe(
      companiesFromServer => {
        this.companies = companiesFromServer;
      },
    );
  }
}
