import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ComposableMap, Geographies, Marker } from 'react-simple-maps';
import type { GeoJsonObject } from 'geojson';
import worldTopologyRaw from '../../data/geo/world-countries-110m.json';
import indiaTopologyRaw from '../../data/geo/india-states-110m.json';
import indiaOutlineRaw from '../../data/geo/india-country-outline.json';

const worldTopology = worldTopologyRaw as unknown as GeoJsonObject;
const indiaTopology = indiaTopologyRaw as unknown as GeoJsonObject;
const indiaOutline = indiaOutlineRaw as unknown as GeoJsonObject;
import {
  indiaStatePins,
  indiaSummary,
  worldRegions,
  KIND_LABEL,
  type PinItem,
  type RegionPin,
} from '../../data/mapExplorerData';

type View = 'world' | 'india';
type EnterHandler = (id: string, isIndia: boolean, e: ReactMouseEvent) => void;

const KIND_DOT: Record<PinItem['kind'], string> = {
  venture: 'bg-brand-green',
  partnership: 'bg-ochre-gold',
  programme: 'bg-foundation-green',
};

const DRILL_DELAY = 450;

function Pulse({ color, size = 6 }: { color: string; size?: number }) {
  return (
    <g>
      <motion.circle
        r={size}
        fill={color}
        fillOpacity={0.35}
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />
      <circle r={size * 0.55} fill={color} stroke="#FDFBF7" strokeWidth={1.5} />
    </g>
  );
}

function Tooltip({
  region,
  style,
  tooltipRef,
}: {
  region: RegionPin;
  style: React.CSSProperties;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      style={style}
      className="pointer-events-none absolute z-20 max-h-[420px] w-80 max-w-[85vw] overflow-y-auto rounded-xl border border-subtle-border bg-warm-ivory p-4 shadow-xl"
    >
      <p className="text-sm font-serif font-bold text-foundation-dark">{region.name}</p>
      <div className="mt-2.5 space-y-3">
        {region.items.map((item, i) => (
          <div key={i} className="border-t border-subtle-border pt-3 first:border-t-0 first:pt-0">
            <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-foundation-green">
              <span className={`h-1.5 w-1.5 rounded-full ${KIND_DOT[item.kind]}`} />
              {KIND_LABEL[item.kind]}
              {item.year && <span className="text-stone-slate">· {item.year}</span>}
            </div>

            {item.story ? (
              <div className="mt-1.5 flex gap-2">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[14px] text-ochre-gold">format_quote</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foundation-green">{item.title}</p>
                  <p className="mt-0.5 font-serif text-[13.5px] font-semibold italic leading-snug text-foundation-dark">
                    {item.headline}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-stone-slate">{item.story}</p>
                  {item.place && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-wider text-stone-slate/70">
                      <span className="material-symbols-outlined text-[11px]">location_on</span>
                      {item.place}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <p className="mt-1 text-xs font-semibold text-foundation-dark">
                  {item.title}
                  {item.place && <span className="font-normal text-stone-slate"> — {item.place}</span>}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-stone-slate">{item.note}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Memoized so mousemove-driven pointer/tooltip re-renders on the parent never
// force react-simple-maps to regenerate every country/state SVG path — that
// recomputation on each mouse pixel is what caused the hover lag.
const WorldMapView = memo(function WorldMapView({
  onEnter,
  onLeave,
}: {
  onEnter: EnterHandler;
  onLeave: () => void;
}) {
  return (
    <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 148 }} width={800} height={460} className="h-full w-full">
      <Geographies geography={worldTopology}>
        {({ geographies, path }) =>
          geographies.map((geo) => {
            const isIndia = geo.properties?.name === 'India';
            // India is rendered separately below using an accurate outline
            // (the bundled Natural Earth shape omits Jammu & Kashmir / Ladakh).
            if (isIndia) return null;
            return (
              <path
                key={geo.rsmKey}
                d={path(geo) ?? undefined}
                className="fill-warm-sand stroke-subtle-border transition-colors duration-200 hover:fill-warm-alabaster"
                strokeWidth={0.6}
              />
            );
          })
        }
      </Geographies>

      <Geographies geography={indiaOutline}>
        {({ geographies, path }) =>
          geographies.map((geo) => (
            <path
              key={geo.rsmKey}
              d={path(geo) ?? undefined}
              onMouseEnter={(e) => onEnter('india', true, e)}
              onMouseLeave={onLeave}
              className="cursor-pointer fill-brand-green/25 stroke-brand-green transition-colors duration-200 hover:fill-brand-green/40"
              strokeWidth={0.6}
            />
          ))
        }
      </Geographies>

      {worldRegions.map((region) => (
        <Marker
          key={region.id}
          coordinates={region.coordinates}
          onMouseEnter={(e) => onEnter(region.id, false, e)}
          onMouseLeave={onLeave}
          className="cursor-pointer"
        >
          <Pulse color="#6ab43e" size={5.5} />
        </Marker>
      ))}

      <Marker coordinates={indiaSummary.coordinates} style={{ pointerEvents: 'none' }}>
        <Pulse color="#C59B27" size={8} />
      </Marker>
    </ComposableMap>
  );
});

const IndiaMapView = memo(function IndiaMapView({
  hoveredId,
  stateIdByName,
  onEnter,
  onLeave,
}: {
  hoveredId: string | null;
  stateIdByName: Record<string, string>;
  onEnter: EnterHandler;
  onLeave: () => void;
}) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [82.8, 22.6], scale: 950 }}
      width={760}
      height={700}
      className="h-full w-full"
    >
      <Geographies geography={indiaTopology}>
        {({ geographies, path }) =>
          geographies.map((geo) => {
            const pinId = stateIdByName[(geo.properties?.NAME_1 as string) ?? ''];
            return (
              <path
                key={geo.rsmKey}
                d={path(geo) ?? undefined}
                onMouseEnter={pinId ? (e) => onEnter(pinId, false, e) : undefined}
                onMouseLeave={pinId ? onLeave : undefined}
                className={
                  pinId
                    ? `cursor-pointer stroke-brand-green/60 transition-colors duration-200 ${
                        hoveredId === pinId ? 'fill-brand-green/35' : 'fill-brand-green/10 hover:fill-brand-green/25'
                      }`
                    : 'fill-warm-sand stroke-subtle-border'
                }
                strokeWidth={0.7}
              />
            );
          })
        }
      </Geographies>

      {indiaStatePins.map((pin) => (
        <Marker
          key={pin.id}
          coordinates={pin.coordinates}
          onMouseEnter={(e) => onEnter(pin.id, false, e)}
          onMouseLeave={onLeave}
          className="cursor-pointer"
        >
          <Pulse color={hoveredId === pin.id ? '#C59B27' : '#6ab43e'} size={5.5} />
        </Marker>
      ))}
    </ComposableMap>
  );
});

const WorldMapExplorer = () => {
  const [view, setView] = useState<View>('world');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [tooltipSize, setTooltipSize] = useState({ width: 320, height: 160 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const drillTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allRegions = useMemo<Record<string, RegionPin>>(() => {
    const map: Record<string, RegionPin> = { india: indiaSummary };
    worldRegions.forEach((r) => (map[r.id] = r));
    indiaStatePins.forEach((r) => (map[r.id] = r));
    return map;
  }, []);

  const stateIdByName = useMemo(() => {
    const map: Record<string, string> = {};
    indiaStatePins.forEach((p) => (map[p.stateId] = p.id));
    return map;
  }, []);

  const clearDrillTimer = useCallback(() => {
    if (drillTimer.current) {
      clearTimeout(drillTimer.current);
      drillTimer.current = null;
    }
  }, []);

  const scheduleDrillIntoIndia = useCallback(() => {
    clearDrillTimer();
    drillTimer.current = setTimeout(() => {
      setView('india');
      setHoveredId(null);
    }, DRILL_DELAY);
  }, [clearDrillTimer]);

  const trackPointer = useCallback((e: ReactMouseEvent) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setPointer({
      x: Math.min(Math.max(x, 8), bounds.width - 8),
      y: Math.min(Math.max(y, 8), bounds.height - 8),
    });
  }, []);

  const handleEnter = useCallback<EnterHandler>(
    (id, isIndia, e) => {
      trackPointer(e);
      setHoveredId(id);
      if (isIndia) scheduleDrillIntoIndia();
    },
    [trackPointer, scheduleDrillIntoIndia]
  );

  const handleMove = useCallback((e: ReactMouseEvent) => trackPointer(e), [trackPointer]);

  const handleLeave = useCallback(() => {
    clearDrillTimer();
    setHoveredId(null);
  }, [clearDrillTimer]);

  const backToWorld = useCallback(() => {
    clearDrillTimer();
    setView('world');
    setHoveredId(null);
  }, [clearDrillTimer]);

  const hovered = hoveredId ? allRegions[hoveredId] : null;

  useLayoutEffect(() => {
    if (hovered && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipSize({ width: rect.width, height: rect.height });
    }
  }, [hovered]);

  const containerWidth = containerRef.current?.getBoundingClientRect().width ?? 800;
  const containerHeight = containerRef.current?.getBoundingClientRect().height ?? 600;
  const MARGIN = 12;
  const preferLeft = pointer.x > containerWidth - tooltipSize.width - 24;
  const rawLeft = preferLeft ? pointer.x - tooltipSize.width - 18 : pointer.x + 18;
  const preferAbove = pointer.y > containerHeight - tooltipSize.height - 24;
  const rawTop = preferAbove ? pointer.y - tooltipSize.height - 14 : pointer.y - 30;
  const tooltipStyle: React.CSSProperties = {
    left: Math.min(Math.max(rawLeft, MARGIN), Math.max(containerWidth - tooltipSize.width - MARGIN, MARGIN)),
    top: Math.min(Math.max(rawTop, MARGIN), Math.max(containerHeight - tooltipSize.height - MARGIN, MARGIN)),
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-subtle-border bg-gradient-to-br from-warm-alabaster to-parchment"
      onMouseMove={view === 'world' ? handleMove : undefined}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle-border bg-warm-ivory/70 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-brand-green">public</span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-foundation-green">
            {view === 'world' ? 'Global Presence' : 'India — Ventures & Partnerships'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 sm:flex">
            {(Object.keys(KIND_LABEL) as PinItem['kind'][]).map((k) => (
              <span key={k} className="flex items-center gap-1.5 font-mono text-[10px] text-stone-slate">
                <span className={`h-1.5 w-1.5 rounded-full ${KIND_DOT[k]}`} />
                {KIND_LABEL[k]}
              </span>
            ))}
          </div>
          <AnimatePresence>
            {view === 'india' && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                onClick={backToWorld}
                className="inline-flex items-center gap-1 rounded-md border border-subtle-border bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foundation-green transition-colors hover:border-brand-green"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                World Map
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="px-5 pt-3 text-center text-[11px] text-stone-slate sm:hidden">
        Tap a pin to see local ventures & partnerships.
      </p>

      {/* Map viewport */}
      <div className="relative h-[420px] sm:h-[460px] lg:h-[520px]">
        <AnimatePresence mode="wait">
          {view === 'world' ? (
            <motion.div
              key="world"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <WorldMapView onEnter={handleEnter} onLeave={handleLeave} />
            </motion.div>
          ) : (
            <motion.div
              key="india"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <IndiaMapView hoveredId={hoveredId} stateIdByName={stateIdByName} onEnter={handleEnter} onLeave={handleLeave} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hovered && <Tooltip region={hovered} style={tooltipStyle} tooltipRef={tooltipRef} />}
        </AnimatePresence>

        {view === 'world' && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-subtle-border bg-warm-ivory/90 px-3.5 py-1.5 font-mono text-[10px] text-stone-slate shadow-sm">
            Hover a pin — hover <span className="font-bold text-foundation-green">India</span> to explore it region by region
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMapExplorer;
