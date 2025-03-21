import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcon = () => {
  // Only run on client-side
  if (typeof window !== 'undefined') {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/map/marker-icon-2x.png',
      iconUrl: '/images/map/marker-icon.png',
      shadowUrl: '/images/map/marker-shadow.png',
    });
  }
};

interface LocationMapProps {
  latitude: number;
  longitude: number;
  popupText?: string;
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  latitude,
  longitude,
  popupText,
  zoom = 14,
  height = '400px',
  width = '100%',
  className = '',
}) => {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // Prevent SSR issues with Leaflet
  if (typeof window === 'undefined') {
    return (
      <div 
        style={{ height, width }} 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg ${className}`}
      >
        <p className="text-gray-500 dark:text-gray-400">Map loading...</p>
      </div>
    );
  }

  return (
    <div style={{ height, width }} className={className}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          {popupText && <Popup>{popupText}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap; 