import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LineTableDataSource, LineTableItem } from './line-table-datasource';
import { Observable } from 'rxjs';
import { lineStatVM } from '../models/line-stat-vm';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-line-table',
  templateUrl: './line-table.component.html',
  styleUrls: ['./line-table.component.css']
})
export class LineTableComponent implements AfterViewInit, OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<LineTableItem>;
  // dataSource: LineTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];
  @Input() stats: lineStatVM[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    // this.dataSource = new LineTableDataSource();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
