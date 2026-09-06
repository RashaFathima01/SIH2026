import React, { useState } from 'react';
import { X, Code2, Terminal, Copy, Check, FileCode, Cpu, Layers } from 'lucide-react';
import { ARCHITECTURE_CODE_SNIPPETS } from '../data/codeSnippets';

interface CodeExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExplorerModal: React.FC<CodeExplorerModalProps> = ({ isOpen, onClose }) => {
  const [activeSnippetKey, setActiveSnippetKey] = useState<string>('opencv_quality_gate');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSnippet = ARCHITECTURE_CODE_SNIPPETS[activeSnippetKey] || ARCHITECTURE_CODE_SNIPPETS.opencv_quality_gate;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { key: 'opencv_quality_gate', label: 'opencv_quality_gate.py', tag: 'OpenCV 4.10' },
    { key: 'pytorch_afpn_model', label: 'pytorch_afpn_model.py', tag: 'PyTorch 2.3' },
    { key: 'gradcam_engine', label: 'gradcam_engine.py', tag: 'Grad-CAM XAI' },
    { key: 'fastapi_sync', label: 'fastapi_sync.py', tag: 'FastAPI 3.11' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-200">SightSeer AI — Python Codebase Explorer</h3>
              <p className="text-[11px] text-slate-400">Production-grade edge &amp; cloud modules</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Python Script</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Script Selector Tabs */}
        <div className="flex flex-wrap gap-1 px-4 py-2 bg-slate-900/80 border-b border-slate-800 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setActiveSnippetKey(t.key);
                setCopied(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                activeSnippetKey === t.key
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{t.label}</span>
              <span className={`text-[10px] px-1 rounded ${activeSnippetKey === t.key ? 'bg-teal-700 text-teal-100' : 'bg-slate-800 text-slate-400'}`}>
                {t.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Description Bar */}
        <div className="px-5 py-2.5 bg-slate-900/40 border-b border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>{currentSnippet.description}</span>
          <span className="font-mono text-[11px] text-teal-400">Python 3.11</span>
        </div>

        {/* Code Viewport with Line Numbers */}
        <div className="p-5 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed bg-slate-950 select-text flex-1">
          <pre className="text-slate-300">
            <code>{currentSnippet.code}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Target Architecture: ARM Cortex-A53 / NEON SIMD Accelerated</span>
          <span className="font-mono text-slate-500">License: Apache-2.0</span>
        </div>
      </div>
    </div>
  );
};
