import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_MANIFEST, ManifestJson, DeviceType } from './types';
import { EditorPanel } from './components/EditorPanel';
import { DeviceFrame } from './components/DeviceFrame';
import { Smartphone, Tablet, Github } from 'lucide-react';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(DEFAULT_MANIFEST, null, 4));
  const [parsedManifest, setParsedManifest] = useState<ManifestJson>(DEFAULT_MANIFEST);
  const [error, setError] = useState<string | null>(null);
  
  // Icon handling
  const [uploadedIconUrl, setUploadedIconUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [activeDevice, setActiveDevice] = useState<DeviceType>('android');

  // Parse JSON effect
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedManifest(parsed);
      setError(null);
    } catch (e: any) {
      // Don't update manifest if invalid, just set error
      setError(e.message || "Invalid JSON");
    }
  }, [jsonInput]);

  // Determine which icon to show
  // Priority: Uploaded File > Manifest src (if absolute) > Placeholder
  const displayIcon = useMemo(() => {
    if (uploadedIconUrl) return uploadedIconUrl;
    
    // Check if manifest has icons
    if (parsedManifest.icons && parsedManifest.icons.length > 0) {
        // Try to find a suitable icon. 
        // Note: Relative paths in the manifest won't work in this sandbox unless they point to a public URL.
        // We will optimistically use the first one, but if it fails to load the img tag will handle it.
        // For the default example, we don't have those files, so we might want a placeholder logic 
        // if the user hasn't uploaded anything but is using the default JSON.
        
        // However, standard browser behavior for "pasting manifest" usually implies you need to supply the assets
        // or they won't render. 
        // To make the default state look good, we can check if it matches our default template 
        // and return a placeholder if so.
        if (parsedManifest.name === "Lumen Prayer Bank" && !uploadedIconUrl) {
            // Return a generic placeholder for the initial state so it doesn't look broken
            return "https://picsum.photos/200"; 
        }

        const icon = parsedManifest.icons.find(i => parseInt(i.sizes?.split('x')[0] || '0') >= 192) || parsedManifest.icons[0];
        return icon.src; 
    }
    return null;
  }, [parsedManifest, uploadedIconUrl]);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedIconUrl(url);
    setUploadedFileName(file.name);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* Left Panel: Editor (35-40% width) */}
      <div className="w-full md:w-[450px] lg:w-[500px] h-[50vh] md:h-full shrink-0 z-20 shadow-xl">
        <EditorPanel 
          jsonValue={jsonInput}
          onJsonChange={setJsonInput}
          onImageUpload={handleImageUpload}
          error={error}
          fileName={uploadedFileName}
        />
      </div>

      {/* Right Panel: Preview Area */}
      <div className="flex-1 h-[50vh] md:h-full relative bg-gray-950 flex flex-col">
        
        {/* Background Grid Pattern for style */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
             style={{
               backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)',
               backgroundSize: '24px 24px'
             }}>
        </div>

        {/* Toolbar */}
        <div className="relative z-10 flex items-center justify-center gap-4 p-6 mt-4 md:mt-10">
          <div className="bg-gray-900/80 backdrop-blur-md p-1.5 rounded-xl border border-gray-800 flex items-center gap-1">
            <button
              onClick={() => setActiveDevice('android')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeDevice === 'android' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Smartphone size={16} />
              Android
            </button>
            <button
              onClick={() => setActiveDevice('ios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeDevice === 'ios' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Tablet size={16} />
              iOS
            </button>
          </div>
        </div>

        {/* Device Canvas */}
        <div className="flex-1 relative z-10 flex items-center justify-center pb-12 px-4 overflow-y-auto custom-scrollbar">
          <div className="transform transition-all duration-500 scale-[0.85] md:scale-100">
            <DeviceFrame 
              type={activeDevice} 
              manifest={parsedManifest} 
              iconSrc={displayIcon} 
            />
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="absolute bottom-4 right-4 z-10 text-gray-600 text-xs hidden md:flex items-center gap-2">
           <span>Preview Mode</span>
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        </div>

      </div>
    </div>
  );
};

export default App;