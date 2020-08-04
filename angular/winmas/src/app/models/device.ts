import { ChartDataSets } from 'chart.js';

function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}
export interface Device {
    device_id: number;
    id: number;
    insertion_date: string;
    mac: string;
    ssid: string;
    x: number;
    y: number;
}

export class DevicePoint {
    device: Device
    point: ChartDataSets

    constructor(device: Device, color: string) {
        this.device = device;
        this.point = this.generatePoint(color)

    }

    generatePoint(color) {
        let row: ChartDataSets = {};
        let point: any = { x: Number, y: Number };

        point["x"] = this.device.x;
        point["y"] = this.device.y;
        row.data = [point];
        row.label = this.device.mac;
        row.pointRadius = 5;
        //set others property of row
        row.pointBackgroundColor = color
        row.backgroundColor = color
        return row
    }
}

