import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Clock, Globe, Recycle, Heart } from 'lucide-react';
import './RecyclingLocator.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Location types to search for
const LOCATION_TYPES = [
    { label: "All", value: "all" },
    { label: "Recycling", value: "recycling" },
    { label: "Donation", value: "donation" },
];

// Converts metres to miles
const toMiles = m => (m / 1609.34).toFixed(1);

// Load Google Maps script once
function loadGoogleMapsScript(apiKey) {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) { resolve(); return; }
        const existing = document.getElementById('google-maps-script');
        if (existing) { existing.addEventListener('load', resolve); return; }
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);

    });
}

export default function RecyclingLocator() {
    const [postcode, setPostcode] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [searched, setSearched] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);


    // Initialise map
    useEffect(() => {
        loadGoogleMapsScript(GOOGLE_MAPS_API_KEY).then(() => {
            if (!mapRef.current || mapInstanceRef.current) return;
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                //Default to London
                center: { lat: 51.5074, lng: -0.1278 },
                zoom: 12,
                styles: [
                    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }

                ]

            });
        });
    }, []);

    // Clear old markers
    const clearMarkers = () => {
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];
    };

    // Search for locations near postcode
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!postcode.trim()) return;

        // validate UK postcode is real
        const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
        if (!postcodeRegex.test(postcode.trim())) {
            setError('Please enter a valid UK postcode (e.g. SW1A 1AA) .');
            return;
        }
        setLoading(true);
        setError('');
        setLocations([]);
        setSearched(false);

        try {
            await loadGoogleMapsScript(GOOGLE_MAPS_API_KEY);
            const geocoder = new window.google.maps.Geocoder();

            // Geocode postcode to coordinates
            geocoder.geocode({ address: postcode + ', UK' }, (results, status) => {
                if (status !== 'OK' || !results[0]) {
                    setError('Could not find that postcode. Please try again.');
                    setLoading(false);
                    return;
                }

                const location = results[0].geometry.location;
                const map = mapInstanceRef.current;
                map.setCenter(location);
                map.setZoom(13);

                const service = new window.google.maps.places.PlacesService(map);
                const allResults = [];
                let completed = 0;

                // Search queries for recycling and donation location
                const queries = [
                    'clothes recycling drop off',
                    'clothing donation charity shop',
                    'textile recycling bank',
                ];

                queries.forEach(query => {
                    service.textSearch({
                        query,
                        location,
                        radius: 5000,
                    }, (results, status) => {
                        completed++;
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                            results.forEach(r => {
                                //Avoid duplicates by place_id
                                if (!allResults.find(x => x.place_id === r.place_id)) {
                                    allResults.push(r);
                                }
                            });
                        }
                        if (completed === queries.length) {
                            // Sort by distance
                            const origin = new window.google.maps.LatLng(location.lat(), location.lng());
                            const withDistance = allResults.map(r => ({
                                ...r,
                                distance: window.google.maps.geometry
                                    ? window.google.maps.geometry.spherical.computeDistanceBetween(
                                        origin,
                                        r.geometry.location

                                    )
                                    : null,
                                type: r.name.toLowerCase().includes('recycl') ? 'recycling' : 'donation',
                            })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

                            setLocations(withDistance);
                            setSearched(true);
                            setLoading(false);
                            plotMarkers(withDistance, map);
                        }
                    });
                });
            });
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    //Plot markers on the map
    const plotMarkers = (places, map) => {
        clearMarkers();
        places.forEach((place, i) => {
            const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                label: { text: String(i + 1), color: '#fff', fontSize: '12px', fontWeight: 'bold' },
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 14,
                    fillColor: place.type === 'recycling' ? '#4a7c59' : '#7c4a6a',
                    fillOpacity: 1,
                    strokeColor: '#fff',
                    strokeWeight: 2,

                }

            });
            marker.addListener('click', () => setSelectedId(place.place_id));
            markersRef.current.push(marker);

        });

    };

    const filtered = filter === 'all'
        ? locations
        : locations.filter(l => l.type === filter);

    const pill = (active) => ({
        padding: "0.35rem 0.85rem",
        border: `1.5px solid ${active ? "#111" : "#ccc"}`,
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#555",
        fontSize: "0.8rem", cursor: "pointer",
        letterSpacing: "0.02em", transition: "all 0.15s",
        fontFamily: "Georgia, serif",
    });

    return (
        <div className="locator-page">

            {/*Header*/}
            <div className="locator-header">
                <h1 className="locator-header__title">Recycling Locator</h1>
                <p className="locator-header__subtitle">Find your nearest clothing recycling and donation drop-off points</p>

            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="locator-search">
                <input
                    type="text"
                    placeholder="Enter your postcode..."
                    value={postcode}
                    onChange={e => setPostcode(e.target.value)}
                    className="locator-search__input"
                />
                <button type="submit" className="locator-search__btn" disabled={loading}>
                    {loading ? 'Searching...' : 'Find Locations'}
                </button>
            </form>
            {error && <p className="locator-error">{error}</p>}

            {/*Filter pills */}
            {searched && (
                <div className="locator-filters">
                    {LOCATION_TYPES.map(t => (
                        <button key={t.value} style={pill(filter === t.value)} onClick={() => setFilter(t.value)}>
                            {t.label}
                        </button>
                    ))}

                </div>
            )}

            {/*Map + Results layout*/}
            <div className="locator-body">

                {/*Map*/}
                <div className="locator-map-wrapper">
                    <div ref={mapRef} className="locator-map" />
                    {!searched && !loading && (
                        <div className="locator-map__placeholder">
                            <MapPin size={32} strokeWidth={1.5} />
                            <p>Enter a postcode to see locations on the map</p>
                        </div>
                    )}
                </div>
                {/* Results list */}
                <div className="locator-results">
                    {loading && (
                        <div className="locator-results__loading">
                            <div className="locator-spinner" />
                            <p>Finding locations near you...</p>
                        </div>
                    )}

                    {searched && filtered.length === 0 && !loading && (
                        <div className="locator-results__empty">
                            <p>No {filter === 'all' ? '' : filter} locations found nearby.</p>
                            <p>Try a different postcode or filter.</p>
                        </div>
                    )}

                    {filtered.map((place, i) => (
                        <div
                            key={place.place_id}
                            className={`locator-card ${selectedId === place.place_id ? 'locator-card--selected' : ''}`}

                            onClick={() => {
                                setSelectedId(place.place_id);
                                mapInstanceRef.current?.panTo(place.geometry.location);
                                mapInstanceRef.current?.setZoom(15);
                            }}
                        >
                            {/*Number + type badge */}
                            <div className="locator-card__header">
                                <span className="locator-card__number">{i + 1}</span>
                                <span
                                    className="locator-card__type"
                                    style={{ background: place.type === 'recycling' ? '#4a7c59' : '#7c4a6a' }}
                                >
                                    {place.type === 'recycling'
                                        ? <><Recycle size={11} /> Recycling</>
                                        : <><Heart size={11} />Donation</>
                                    }
                                </span>
                                {place.distance && (
                                    <span className="locator-card__distance">
                                        <MapPin size={11} /> {toMiles(place.distance)} mi
                                    </span>
                                )}
                            </div>

                            <h3 className="locator-card__name">{place.name}</h3>

                            {place.vicinity && (
                                <p className="locator-card__address">{place.vicinity}</p>

                            )}

                            <div className="locator-card__details">
                                {/* View hours */}
                                {place.place_id && (
                                    <a
                                    href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="locator-card__link"
                                    onClick={e => e.stopPropagation()}
                                >
                                 <Clock size={12} /> View Hours
                                 </a>     
                                )}

                                {/* Rating */}
                                {place.rating && (
                                    <span className="locator-card__rating">★{place.rating}</span>
                                )}

                            </div>

                            {/* Links */}
                            <div className="locator-card__links">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="locator-card__link"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <Globe size={12} /> Get Directions
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
