import { Device } from './device';

export class DeviceDates {
    devices: Device[];
    start_date: number;
    end_date: number;

    constructor(start_date, end_date, devices){
        this.devices = devices
        this.start_date = Math.floor((new Date(start_date*1000).setSeconds(0))/1000)
        this.end_date = Math.floor((new Date(end_date*1000).setSeconds(0))/1000)
    }
}