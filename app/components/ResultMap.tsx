'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CommunityResource } from '../types/resource';

// Fix Leaflet's default icon path issues in React
const iconDefault = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

interface ResultMapProps {
    resources: CommunityResource[];
    activeResourceId?: string | null;
}

// Map bounds updater component
function MapUpdater({ resources, activeResourceId }: ResultMapProps) {
    const map = useMap();

    useEffect(() => {
        if (!resources || resources.length === 0) return;

        // If an active resource is clicked in the UI, fly directly to it
        if (activeResourceId) {
            const activeResource = resources.find(r => r.id === activeResourceId);
            if (activeResource?.latitude && activeResource?.longitude) {
                map.flyTo([activeResource.latitude, activeResource.longitude], 14, {
                    animate: true,
                    duration: 1.5
                });
                return;
            }
        }

        // Otherwise, fit bounds to show all returned pins
        const bounds = L.latLngBounds(
            resources
                .filter(r => r.latitude && r.longitude)
                .map(r => L.latLng(r.latitude!, r.longitude!))
        );

        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
    }, [map, resources, activeResourceId]);

    return null;
}

export default function ResultMap({ resources, activeResourceId }: ResultMapProps) {
    // Default center to Fairfax, VA if no resources 
    const defaultCenter: [number, number] = [38.8462, -77.3064];

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
            <MapContainer
                center={defaultCenter}
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {resources.map(resource => {
                    if (!resource.latitude || !resource.longitude) return null;

                    return (
                        <Marker
                            key={resource.id}
                            position={[resource.latitude, resource.longitude]}
                        >
                            <Popup className="rounded-xl custom-popup">
                                <div className="p-1">
                                    <h3 className="font-bold text-text-dark text-sm mb-1">{resource.name}</h3>
                                    <p className="text-gray-500 text-xs mb-1.5 leading-relaxed line-clamp-2">{resource.short_description}</p>
                                    <p className="text-gray-700 text-xs font-medium mb-3">
                                        📍 {resource.address}, {resource.city} {resource.zip_code}
                                    </p>
                                    <div className="flex gap-3 border-t border-gray-100 pt-2">
                                        {resource.website && (
                                            <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-primary-teal text-xs font-semibold hover:underline">
                                                Visit
                                            </a>
                                        )}
                                        {resource.phone && (
                                            <a href={`tel:${resource.phone}`} className="text-gray-500 text-xs hover:text-text-dark transition-colors">
                                                Call
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapUpdater resources={resources} activeResourceId={activeResourceId} />
            </MapContainer>
        </div>
    );
}
