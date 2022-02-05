import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tool } from '../shared/models/Tool';
import { ToolService } from './tool.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  tools!: Tool[];
  constructor(
    private toolSvc:  ToolService,
    public dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    this.getTools();
  }

  private getTools(): void {

    this.toolSvc.getTools().subscribe(
      toolsFromServer => {
        this.tools = toolsFromServer;
      },
    );
  }
}
