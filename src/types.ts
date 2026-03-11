export interface BaziRequest {
  date: string; // Local ISO8601 datetime
  tz?: string; // IANA timezone name
  lon?: number;
  lat?: number;
  standard?: string[];
  boundary?: string[];
  ambiguousTime?: string[];
  nonexistentTime?: string[];
}

export interface Pillar {
  stamm: string;
  zweig: string;
  tier: string;
  element: string;
}

export interface BaziResponse {
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
  };
  chinese: {
    year: {
      stem: string;
      branch: string;
      animal: string;
    };
    month_master: string;
    day_master: string;
    hour_master: string;
  };
}
