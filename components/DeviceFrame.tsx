import React from 'react';
import { DeviceType, ManifestJson } from '../types';
import { getContrastColor } from '../utils/colorUtils';
import { Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  type: DeviceType;
  manifest: ManifestJson;
  iconSrc: string | null;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ type, manifest, iconSrc }) => {
  const backgroundColor = manifest.background_color || '#ffffff';
  const textColor = getContrastColor(backgroundColor);
  const appName = manifest.name || manifest.short_name || 'App Name';

  if (type === 'ios') {
    return (
      <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[3rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
        {/* Notch Area */}
        <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center">
            <div className="h-6 w-32 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div 
          className="flex-1 flex flex-col items-center justify-center relative transition-colors duration-500"
          style={{ backgroundColor: backgroundColor }}
        >
          {/* iOS Status Bar Simulation */}
          <div className={`absolute top-2 px-6 w-full flex justify-between text-[10px] font-bold z-10 ${textColor === 'white' ? 'text-white' : 'text-black'}`}>
            <span>9:41</span>
            <div className="flex gap-1 items-center">
                <Signal size={12} />
                <Wifi size={12} />
                <Battery size={12} />
            </div>
          </div>

          {/* App Icon */}
          <div className="flex flex-col items-center gap-24">
            {/* iOS often doesn't show text on launch screen unless baked into image, but modern PWA generation sometimes does. 
                We will center the icon. iOS icons are usually square with rounded corners. */}
            {iconSrc ? (
              <img 
                src={iconSrc} 
                alt="App Icon" 
                className="w-24 h-24 rounded-2xl shadow-lg object-contain bg-white" 
              />
            ) : (
               <div className="w-24 h-24 rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 text-xs">
                 No Icon
               </div>
            )}
          </div>
          
           {/* iOS Splash usually does NOT show the app name, just the branding color/logo. 
               However, for visualization purposes, some generators add it. We will leave it just logo for 'pure' iOS feel, 
               or add it very subtly at bottom if requested. Let's keep it strictly logo + background for accuracy to native HIG for launch screens.
            */}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/50 rounded-full z-20"></div>
      </div>
    );
  }

  // Android
  return (
    <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
      {/* Camera Hole Punch */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full z-20"></div>

      {/* Screen Content */}
      <div 
        className="flex-1 flex flex-col items-center relative transition-colors duration-500"
        style={{ backgroundColor: backgroundColor }}
      >
        {/* Android Status Bar */}
        <div className={`w-full flex justify-between px-4 py-2 text-xs font-medium z-10 ${textColor === 'white' ? 'text-white/80' : 'text-black/80'}`}>
            <span>12:00</span>
            <div className="flex gap-2">
                <Wifi size={14} />
                <Battery size={14} />
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full pb-16">
            {iconSrc ? (
              <img 
                src={iconSrc} 
                alt="App Icon" 
                // Android splash icons are often adaptive (circle/squircle) but the raw file is usually square.
                // Android 12+ Splash API masks it. We'll simulate a circular mask for standard Android look.
                className="w-28 h-28 object-contain" 
              />
            ) : (
                <div className="w-28 h-28 rounded-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-400 text-xs">
                    No Icon
                </div>
            )}
            
            {/* Android 12+ Splash screens default to showing the app icon. 
                Legacy or custom implementations might show text. 
                Common PWA behavior on Android (Chrome) puts the name at the bottom or below icon. */}
            <div 
                className={`mt-6 text-xl font-medium tracking-wide opacity-90 ${textColor === 'white' ? 'text-white' : 'text-black'}`}
            >
                {appName}
            </div>
        </div>
      </div>

      {/* Android Nav Bar (Gesture) */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-500/50 rounded-full z-20 mb-2"></div>
    </div>
  );
};