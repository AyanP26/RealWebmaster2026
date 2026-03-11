"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CommunityResource } from "../types/resource";

// Create a custom SVG icon
const createCustomIcon = (isActive: boolean) => {
    // Weave.NoVA branding: Teal for default, vibrant Purple for active/highlighted
    const color = isActive ? "#7c3aed" : "#0d9488";
    const scale = isActive ? "scale(1.25)" : "scale(1)";
    const shadow = isActive ? "drop-shadow(0 10px 15px rgba(124,58,237,0.5))" : "drop-shadow(0 4px 6px rgba(13,148,136,0.3))";

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="transform: ${scale}; filter: ${shadow}; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: center bottom;">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3" fill="white"></circle>
        </svg>
    `;

    return L.divIcon({
        className: 'custom-leaflet-icon bg-transparent border-none',
        html: svg,
        iconSize: [36, 46],
        iconAnchor: [18, 46], // Anchors the bottom tip of the pin to the location
    });
};

function MapBoundsManager({ resources, activeResourceId, clickedResourceId }: { resources: CommunityResource[], activeResourceId?: string | null, clickedResourceId?: string | null }) {
    const map = useMap();
    const prevClickedRef = useRef<string | null>(null);

    // Watch for layout resizing so Leaflet's internal coordinates don't get misaligned
    // This fixes the bug where the map visually shifts to Pennsylvania because the container grew
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        const container = map.getContainer();
        if (container) resizeObserver.observe(container);

        // Also force a redraw shortly after mount
        setTimeout(() => map.invalidateSize(), 150);
        return () => resizeObserver.disconnect();
    }, [map]);

    useEffect(() => {
        const validResources = resources.filter(r => r.latitude && r.longitude);
        if (validResources.length === 0) return;

        // If an item is CLICKED (not just hovered), fly to it beautifully.
        // We track prevClickedRef so we don't refly repeatedly if it's already centered.
        if (clickedResourceId && clickedResourceId !== prevClickedRef.current) {
            const clickedResource = validResources.find(r => r.id === clickedResourceId);
            if (clickedResource && clickedResource.latitude && clickedResource.longitude) {
                prevClickedRef.current = clickedResourceId;
                map.flyTo([clickedResource.latitude, clickedResource.longitude], 15, {
                    duration: 1.2,
                    easeLinearity: 0.25
                });
                return;
            }
        }

        // If nothing is explicitly clicked right now, auto-bound to fit all resources
        if (!clickedResourceId) {
            const bounds = L.latLngBounds(validResources.map(r => [r.latitude as number, r.longitude as number]));

            map.flyToBounds(bounds, {
                padding: [50, 50],
                duration: 1.2,
                maxZoom: 13
            });
        }

    }, [resources, clickedResourceId, map]);

    return null;
}

interface ResultMapProps {
    resources: CommunityResource[];
    activeResourceId?: string | null;
    clickedResourceId?: string | null;
    onMarkerClick?: (resourceId: string) => void;
}

export default function ResultMap({ resources, activeResourceId, clickedResourceId, onMarkerClick }: ResultMapProps) {
    const defaultCenter: [number, number] = [38.8462, -77.3064];

    // Find the currently clicked resource to display its info in the overlay
    const clickedResource = clickedResourceId ? resources.find(r => r.id === clickedResourceId) : null;

    return (
        <div className="relative w-full h-full">
            {/* Custom Interactive Overlay for Clicked Pins (Outside Leaflet) */}
            {clickedResource && (
                <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl max-w-sm border border-gray-100 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                            {clickedResource.category}
                        </span>
                        {clickedResource.is_free_service && (
                            <span className="flex items-center text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
                                Free Service
                            </span>
                        )}
                    </div>
                    <h4 className="font-extrabold text-gray-900 text-lg leading-tight mb-2">
                        {clickedResource.name}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">
                        {clickedResource.short_description}
                    </p>
                    <div className="text-xs font-medium text-gray-500 flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {clickedResource.address}, {clickedResource.city}
                    </div>
                </div>
            )}

            <MapContainer
                center={defaultCenter}
                zoom={10}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                {/* Clean, fast CartoDB Voyager Map Tiles (No API key needed!) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {resources.filter(r => r.latitude && r.longitude).map((resource) => (
                    <Marker
                        key={resource.id}
                        position={[resource.latitude as number, resource.longitude as number]}
                        icon={createCustomIcon(resource.id === activeResourceId || resource.id === clickedResourceId)}
                        eventHandlers={{
                            click: () => {
                                if (onMarkerClick) onMarkerClick(resource.id);
                            }
                        }}
                        zIndexOffset={resource.id === activeResourceId || resource.id === clickedResourceId ? 1000 : 0}
                    />
                ))}

                <MapBoundsManager resources={resources} activeResourceId={activeResourceId} clickedResourceId={clickedResourceId} />
            </MapContainer>
        </div>
    );
}
