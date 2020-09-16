import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { Location } from '../models/location';
import * as _ from "lodash";
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proxy-logger',
  templateUrl: './proxy-logger.component.html',
  styleUrls: ['./proxy-logger.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProxyLoggerComponent implements OnInit {

  displayedColumns = ['detail','date','mac', 'x', 'y'];
  dataSource = new TableVirtualScrollDataSource();
  
  @Output() locationDetail: EventEmitter<Location> = new EventEmitter<Location>()

  @Input() set locations(locations: Location[]) {
    console.log(location)
    _.forEach(locations, location => {
      let new_date = new Date(location.insertion_date)
      location.insertion_date = new_date.toString()
    })
    this.setDataSource(locations)
  }

  constructor() { }

  ngOnInit(): void {
  }
  setDataSource(locations: Location[]) {
    this.dataSource = new TableVirtualScrollDataSource(locations)
  }

  showChart(location:Location){
    console.log(location)
    this.locationDetail.emit(location)
  }

}
