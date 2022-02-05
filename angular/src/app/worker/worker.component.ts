import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Worker} from '../shared/models/Worker'
import { WorkerService } from './worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

workers!: Worker[];

showSpinner: boolean = true

  constructor(
    private workerSvc: WorkerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getWorkers();
  }


  private getWorkers(): void {

    this.workerSvc.getWorkers().subscribe(
      workers => {
        this.workers = workers;
      },
    );
  }
}
