import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/shared/models/Company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

 company!: Company;
 
  constructor(private companySvc: CompanyService,
              private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    const companyId =Number(this.route.snapshot.paramMap.get('id'))

    this.companySvc.getCompanyById(companyId).subscribe(
      company => {
        this.company = company;
      }
    );
  }
}
