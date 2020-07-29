export interface Markable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}

export class CustomMap {
  private googleMap: google.maps.Map

  constructor(elementId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(elementId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    })
  }

  addMarker(entity: Markable): void {
    const { lat, lng } = entity.location
    
    const infowindow = new google.maps.InfoWindow({
      content: entity.markerContent()
    })
    
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat,
        lng
      },
      clickable: true,
      animation: google.maps.Animation.DROP
    })


    marker.addListener('click', () => {
      infowindow.open(this.googleMap, marker)
    })
  }
}