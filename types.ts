export interface ManifestIcon {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: string;
}

export interface ManifestJson {
  name?: string;
  short_name?: string;
  description?: string;
  start_url?: string;
  icons?: ManifestIcon[];
  theme_color?: string;
  background_color?: string;
  display?: string;
  orientation?: string;
}

export type DeviceType = 'android' | 'ios';

export const DEFAULT_MANIFEST: ManifestJson = {
    "name": "Lumen Prayer Bank",
    "short_name": "Prayer Bank",
    "description": "A prayer bank for the Lumen 2026 conference",
    "start_url": "/",
    "icons": [
        {
            "src": "/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "theme_color": "#0C1427",
    "background_color": "#0C1427",
    "display": "standalone"
};