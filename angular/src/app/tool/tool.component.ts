import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tool } from '../shared/models/Tool';
import { ToolDeleteDialogComponent } from './tool-delete-dialog/tool-delete-dialog.component';
import { ToolService } from './tool.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  tools!: Tool[];
  
  showSpinner: boolean = true

  constructor(
    private toolSvc: ToolService,
    private dialog: MatDialog ,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getTools();
  }

  deleteTool(id: number): void {

    const dialogRef = this.dialog.open(ToolDeleteDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.toolSvc.deleteTool(id).subscribe(
          res =>{
            this.snackBar.open("Tool Has BEEN FINALLY DELETED");
            this.getTools();
          },
        );
      }
    })
  }

private getTools(): void{
  this.toolSvc.getTools().subscribe(
    tools =>{
      this.tools = tools;
      this.showSpinner = false;
    }
  )
}

}
