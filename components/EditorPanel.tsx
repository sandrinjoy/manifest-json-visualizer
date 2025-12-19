import React, { useRef } from 'react';
import { Upload, AlertCircle, FileJson } from 'lucide-react';

interface EditorPanelProps {
  jsonValue: string;
  onJsonChange: (value: string) => void;
  onImageUpload: (file: File) => void;
  error: string | null;
  fileName: string | null;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ 
  jsonValue, 
  onJsonChange, 
  onImageUpload, 
  error,
  fileName
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FileJson className="text-blue-400" />
          Configuration
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Paste your <code>manifest.json</code> and upload an icon to preview.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        
        {/* Image Upload Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            App Icon (Optional)
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-blue-500 hover:bg-gray-800/50 transition-colors cursor-pointer group"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="w-8 h-8 text-gray-500 group-hover:text-blue-400 mb-2" />
              <p className="text-sm text-gray-300 font-medium">
                {fileName ? fileName : "Click to upload icon"}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG (Max 2MB)</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>

        {/* JSON Editor Section */}
        <div className="space-y-3 flex-1 flex flex-col">
          <label className="block text-sm font-medium text-gray-300">
            Manifest JSON
          </label>
          <div className="relative flex-1 min-h-[400px]">
            <textarea
              value={jsonValue}
              onChange={(e) => onJsonChange(e.target.value)}
              className={`w-full h-full bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed ${
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700'
              }`}
              spellCheck={false}
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-900/90 text-red-100 text-xs p-2 rounded border border-red-700 flex items-start gap-2 backdrop-blur-sm">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};