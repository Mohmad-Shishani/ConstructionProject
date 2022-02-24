import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Worker} from '../shared/models/Worker'
import { WorkerDeleteDialogComponent } from './worker-delete-dialog/worker-delete-dialog.component';
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getWorkers();
  }

  deleteWorker(id: number): void {

    const dialogRef = this.dialog.open(WorkerDeleteDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.workerSvc.deleteWorker(id).subscribe(
          res => {
            this.snackBar.open("Worker has been deleted successfully");
            this.getWorkers();
          },
            // err => {
            //   this.snackBar.open("INTERNAL SERVER ERROR 500");
            // }
        );

      }
    });
  }


  private getWorkers(): void {

    this.workerSvc.getWorkers().subscribe(
      workers => {
        this.workers = workers;
        this.showSpinner = false;
      },
    );
  }
  
}
