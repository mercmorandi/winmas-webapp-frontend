import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ScatterTableDataSource, ScatterTableItem } from './scatter-table-datasource';
import { Device } from '../models/device';

@Component({
  selector: 'app-scatter-table',
  templateUrl: './scatter-table.component.html',
  styleUrls: ['./scatter-table.component.css']
})
export class ScatterTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ScatterTableItem>;
  dataSource: ScatterTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ['id', 'name'];
  displayedColumns = ['detail','mac', 'x', 'y'];
  @Input() devices: Device[] = []
  @Output() deviceDetail: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit() {
    this.dataSource = new ScatterTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  goDetails(id:number){
    this.deviceDetail.emit(id)
  }
}
