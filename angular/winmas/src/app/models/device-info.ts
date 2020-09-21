export class Location {
    x: number;
    y: number;
    date: Date;
    ssid: string;
}

export class DeviceInfo {
    id: number;
    last_update: Date;
    mac: string;
    occurences: number;
    locations: Location[];
}