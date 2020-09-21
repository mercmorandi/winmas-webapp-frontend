import { Component, OnInit, Input } from '@angular/core';
import { DeviceInfo, Location } from '../models/device-info';
import { Sort } from '@angular/material/sort';
import * as _ from "lodash";

@Component({
  selector: 'app-histogram-details',
  templateUrl: './histogram-details.component.html',
  styleUrls: ['./histogram-details.component.css']
})
export class HistogramDetailsComponent implements OnInit {

  @Input() deviceId: number
  @Input() deviceInfo: DeviceInfo
  @Input() set locations(locations: Location[]) {
    this.setLocations(locations)
  }

  locations_list: Location[]
  constructor() { }

  ngOnInit(): void {
  }

  sortedData: Location[];

  setLocations(locations: Location[]) {
    this.locations_list = _.uniqBy(locations, (location) => {
      let date = new Date(location.date)
      return date.setSeconds(0)
    })
  }

  sortData(sort: Sort) {
    //var data = this.deviceInfo.locations.slice();
    //if (!sort.active || sort.direction === '') {
    //  this.sortedData = this.deviceInfo.locations.slice();
    //  return;
    //}

    this.locations_list.slice().sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date.toString(), b.date.toString(), isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
