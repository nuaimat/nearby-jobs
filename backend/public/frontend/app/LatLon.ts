export class LatLon {
    lat: number;
    lon: number;
    constructor(pos: any) {
        this.from(pos);
    }

    public from(pos: any) : LatLon {
        if(pos.coords){
            return this.from(pos.coords)
        }
        if(pos.lat){
            this.lat = pos.lat;
            this.lon = pos.lng;
        }
        if(pos.latitude){
            this.lat = pos.latitude;
            this.lon = pos.latitude;
        }
    }
}