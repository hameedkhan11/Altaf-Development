export const GlobalStyles = () => (
  <style jsx global>{`
    .leaflet-container {
      z-index: 1 !important;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
    }
    .leaflet-popup-tip {
      background: white !important;
    }
    .property-marker:hover {
      transform: scale(1.1) !important;
    }
    .leaflet-control-zoom {
      border: none !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    }
    .leaflet-control-zoom a {
      background: white !important;
      border: none !important;
      color: #8b2131 !important;
      font-weight: bold !important;
    }
    .leaflet-control-zoom a:hover {
      background: #f3f4f6 !important;
    }
  `}</style>
);