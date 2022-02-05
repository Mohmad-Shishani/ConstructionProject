import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from 'src/app/shared/models/Worker';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit {

  worker!: Worker;

  constructor(private workerSvc: WorkerService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    const workerId = Number(this.route.snapshot.paramMap.get('id'));

    this.workerSvc.getWorkerById(workerId).subscribe(
      worker => {
      this.worker = worker;
      }
    );
  }

}
