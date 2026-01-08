import { IonPage, IonContent } from '@ionic/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Map, { Marker, MapRef, Source, Layer, useMap } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import imgMarkerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';
import { EcopontosContext } from '../context/ecopontosContext';
import { GeolocationContext } from '../context/geolocationContext';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';

interface Props {
  flyToUserLocation: boolean;
  reset: () => void;
}

const Mapa: React.FC<Props> = ({ flyToUserLocation, reset }) => {
  const {
    arrayEcopontos,
    selectedEcoponto,
    setSelectedEcoponto,
    setModalEcoSelecionado,
    setCallShowModalEcoSelecionado,
  } = useContext(EcopontosContext);

  // Coordenadas da posição atual do user
  const { position } = useContext(GeolocationContext)!;

  const mapRef = useRef<MapRef>(null);

  // Quando o selectedEcoponto muda, o mapa move-se para ele
  useEffect(() => {
    if (selectedEcoponto && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedEcoponto.Longitude, selectedEcoponto.Latitude],
        zoom: 16.5,
        duration: 3000,
        essential: true,
        offset: [0, -260],
      });
    }
  }, [selectedEcoponto]);

  // Voar para a localização do user
  useEffect(() => {
    if (flyToUserLocation) {
      if (mapRef.current && position) {
        mapRef.current.flyTo({
          center: [position.lng, position.lat],
          zoom: 13,
          duration: 3000,
          essential: true,
          offset: [0, -10],
        });
      }
      reset();
    }
  }, [flyToUserLocation]);

  // Código para animar o Marker quando a posição GPS do user atualizar
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(null);
  const animationRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!position?.lat || !position?.lng) return;

    // Primeira posição - sem animação
    if (!markerPos) {
      setMarkerPos({ lat: position.lat, lng: position.lng });
      return;
    }

    // Se já está a animar, ignorar
    if (isAnimatingRef.current) return;

    // Cancelar animação anterior
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Iniciar nova animação
    isAnimatingRef.current = true;
    const startPos = { ...markerPos };
    const endPos = { lat: position.lat, lng: position.lng };

    let frame = 0;
    const totalFrames = 20;

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);

      setMarkerPos({
        lat: startPos.lat + (endPos.lat - startPos.lat) * progress,
        lng: startPos.lng + (endPos.lng - startPos.lng) * progress,
      });

      if (frame < totalFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, [position]);

  // Função para conseguir a rota e fazer display no mapa
  async function getRoute(start: number[], end: number[]) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${
        end[1]
      }?steps=true&geometries=geojson&overview=full&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
    );

    const json = await query.json();
    const data = json.routes[0];
    const geojson: Feature<Geometry, GeoJsonProperties> = {
      type: 'Feature',
      properties: {},
      geometry: data.geometry,
    };

    const map = mapRef.current?.getMap();
    if (!map) return;

    const source = map.getSource('route');

    if (source && source.type === 'geojson') {
      (source as mapboxgl.GeoJSONSource).setData(geojson);
    } else {
      map.addSource('route', {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#0062ff',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });
    }

    console.log(data.distance);
  }

  return (
    <IonContent style={{ postition: 'relative' }}>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        ref={mapRef}
        initialViewState={{
          latitude: 38.96373575159655,
          longitude: -8.525892398242028,
          zoom: 14.12,
        }}
        style={{ width: '100%', height: '100%' }}
        //mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/mapbox/standard-satellite"
        attributionControl={false}
      >
        {arrayEcopontos.map(
          (eco) =>
            eco.Mostrar && (
              <Marker
                key={eco.Codigo}
                latitude={eco.Latitude}
                longitude={eco.Longitude}
                anchor="bottom"
                onClick={() => {	
                  // SetTimeout para o flyto acontecer mesmo que o user tenha feito double click no marker
                  /*
									getRoute(
											[-8.517099769640195, 38.984597035870635],
											[eco.Longitude, eco.Latitude]
											);*/
                  /* Off temporariamente */
                  setTimeout(() => {
                    const ecoSelecionado = eco;
                    setSelectedEcoponto(ecoSelecionado);
                    setModalEcoSelecionado(true);
                    setCallShowModalEcoSelecionado(true);
                  }, 150);
                }}
              >
                <img
                  className={`imgEcoponto ${selectedEcoponto?.Codigo === eco.Codigo ? 'selected' : ''}`}
                  src={imgMarkerEcoponto}
                />
              </Marker>
            )
        )}
        {markerPos && (
          <Marker latitude={markerPos.lat} longitude={markerPos.lng} anchor="bottom">
            <div
              style={{
                backgroundColor: 'blue',
                borderRadius: '50%',
                width: 20,
                height: 20,
                border: '3px solid white',
                zIndex: 10001,
              }}
            />
          </Marker>
        )}
      </Map>
    </IonContent>
  );
};

export default Mapa;
