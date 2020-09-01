export class Location {
    x: number;
    y: number;
    date: Date;
}

export class DeviceInfo {
    id: number;
    last_update: Date;
    mac: string;
    occurences: number;
    locations: Location[];
}