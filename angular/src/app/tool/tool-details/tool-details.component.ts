import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/app/shared/models/Tool';
import { ToolService } from '../tool.service';

@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.css']
})
export class ToolDetailsComponent implements OnInit {

  tool!: Tool;

  constructor(private toolSvc: ToolService,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const toolId = Number(this.route.snapshot.paramMap.get('id'))

    this.toolSvc.getToolById(toolId).subscribe(
      tool =>{
        this.tool = tool;
      }
    );
}


}