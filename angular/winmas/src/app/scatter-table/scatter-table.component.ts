import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ScatterTableItem } from './scatter-table-datasource';
import { Device } from '../models/device';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({
  selector: 'app-scatter-table',
  templateUrl: './scatter-table.component.html',
  styleUrls: ['./scatter-table.component.css']
})
export class ScatterTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ScatterTableItem>;
  dataSource = new TableVirtualScrollDataSource();
  currentId: number;

  displayedColumns = ['detail','mac', 'x', 'y'];
  @Input() set devices(devices: Device[]) {
    console.log(devices)

    this.setDataSource(devices)
  }
  @Output() deviceDetail: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit() {
    //this.dataSource = new TableVirtualScrollDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  setDataSource(devices: Device[]) {
    this.dataSource = new TableVirtualScrollDataSource(devices)
  }

  goDetails(id:number){
    this.currentId = id
    this.deviceDetail.emit(id)
  }
}
