export class Location {
    x: number;
    y: number;
    date: string;
    ssid: string;
}

export class DeviceInfo {
    id: number;
    last_update: string;
    mac: string;
    occurences: number;
    locations: Location[];
}