import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';

@Component({
    selector: 'lib-geolocation-map',
    templateUrl: './geolocation-map.component.html',
    styleUrls: ['./geolocation-map.component.scss']
})
export class GeolocationMapComponent implements OnInit {
    title = 'geolocation map';
    @ViewChild('myGoogleMap', { static: false })
    map!: GoogleMap;
    @ViewChild(MapInfoWindow, { static: false })
    info!: MapInfoWindow;

    zoom = 1;
    center: google.maps.LatLngLiteral = { lat: 0, lng:0 };
    options: google.maps.MapOptions = {
        zoomControl: false,
        scrollwheel: false,
        fullscreenControl: false,
        streetViewControl: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false
    }
    markers = [] as any;
    infoContent = ''

    constructor() { }

    ngOnInit(): void {
    }

}
