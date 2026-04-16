declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      identify: (params: Record<string, unknown>) => void;
    };
  }
}

export const ttqTrack = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track(event, params);
  }
};
