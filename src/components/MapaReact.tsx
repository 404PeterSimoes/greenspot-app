import { IonPage, IonContent } from '@ionic/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Map, { Marker, MapRef, Source, Layer, useMap } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import imgMarkerEcoponto from '../assets/marker_ecoponto.png';
import './MapaReact.css';
import { EcopontosContext } from '../context/ecopontosContext';
import { GeolocationContext } from '../context/geolocationContext';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
//import { forwardRef, useImperativeHandle } from 'react';

interface Props {
  flyToUserLocation: number;
  removeCameraTilt: number;
  showModalDirecoes: boolean;
  //modeDirecoes: string;
}

const Mapa: React.FC<Props> = ({ flyToUserLocation, removeCameraTilt, showModalDirecoes }) => {
  const {
    arrayEcopontos,
    selectedEcoponto,
    showModalEcoSelecionado,
    setSelectedEcoponto,
    setModalEcoSelecionado,
    setCallShowModalEcoSelecionado,
  } = useContext(EcopontosContext);

  // Coordenadas da posição atual do user
  const { position } = useContext(GeolocationContext)!;

  const [recentSelectedEcoponto, setRecentSelecEco] = useState({ Latitude: 0, Longitude: 0 });

  const mapRef = useRef<MapRef>(null);

  // Função para escolher aleatóriamente um inteiro dentro de dois fornecidos
  const randomInt = (min: number, max: number) => {
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(random);
    return random;
  };

  // Quando o selectedEcoponto muda, o mapa move-se para ele
  useEffect(() => {
    if (selectedEcoponto && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedEcoponto.Longitude, selectedEcoponto.Latitude],
        zoom: 16.5,
        pitch: randomInt(25, 45),
        bearing: randomInt(10, 360),
        duration: 3000,
        essential: true,
        offset: [0, -230],
        padding: 0,
      });
    }
  }, [selectedEcoponto]);

  // Voar para a localização do user
  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.flyTo({
        center: [position.lng, position.lat],
        pitch: 0,
        bearing: 0,
        zoom: 15.5,
        duration: 3000,
        essential: true,
        offset: [0, -10],
        padding: 0,
      });
    }
  }, [flyToUserLocation]);

  // Remover custom 3D camera tilt quando modalEcoSelecionado fechar (por botões de IonTab)
  useEffect(() => {
    if (!showModalEcoSelecionado && !showModalDirecoes && mapRef.current && selectedEcoponto) {
      mapRef.current.flyTo({
        pitch: 0,
        bearing: 0,
        center: [selectedEcoponto.Longitude, selectedEcoponto.Latitude],
        duration: 1500,
        padding: 0,
      });
    }
  }, [showModalEcoSelecionado]);

  // Definir as coordenadas do ecoponto mais recente na variável
  useEffect(() => {
    if (selectedEcoponto) {
      setRecentSelecEco(selectedEcoponto);
    }
  }, [selectedEcoponto]);

  // Remover custom 3D camera tilt quando modalEcoSelecionado fechar (por gesture)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        pitch: 0,
        bearing: 0,
        center: [recentSelectedEcoponto.Longitude, recentSelectedEcoponto.Latitude],
        duration: 1500,
        padding: 0,
      });
    }
  }, [removeCameraTilt]);

  useEffect(() => {
    if (mapRef.current && selectedEcoponto && position) {
      if (showModalDirecoes) {
        const pointA: [number, number] = [selectedEcoponto.Longitude, selectedEcoponto.Latitude];
        const pointB: [number, number] = [position.lng, position.lat];

        mapRef.current.fitBounds([pointA, pointB], {
          padding: { bottom: 370, left: 55, right: 55, top: 90 },
          duration: 1200,
        });
      }
    }
  }, [showModalDirecoes]);

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
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${
      end[1]
    }?steps=true&geometries=geojson&overview=full&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;

    const query = await fetch(url);

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

  useEffect(() => {
    if (showModalDirecoes) {
      
    }
  }, [showModalDirecoes]);

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
            ),
        )}
        {markerPos && (
          <Marker latitude={markerPos.lat} longitude={markerPos.lng} style={{ zIndex: 1000 }}>
            <div
              style={{
                backgroundColor: 'blue',
                borderRadius: '50%',
                width: 20,
                height: 20,
                border: '3px solid white',
              }}
            />
          </Marker>
        )}
      </Map>
    </IonContent>
  );
};

export default Mapa;
