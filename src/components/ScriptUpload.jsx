import React, { useState } from 'react';
import { Map, Upload, FileText } from 'lucide-react';
import { parseScript } from '../utils/scriptParser';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set up the worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export default function ScriptUpload({ onScriptParsed }) {
  const [loading, setLoading] = useState(false);
  const [manualText, setManualText] = useState('');
  const [showManual, setShowManual] = useState(false);

  const handleManualParse = () => {
    if (!manualText.trim()) {
      alert('Please paste the script text');
      return;
    }

    setLoading(true);

    try {
      const parsed = parseScript(manualText);
      onScriptParsed(parsed);
      setShowManual(false);
    } catch (error) {
      alert(`Error parsing script: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    // Check file size (allow up to 500KB for small PDFs)
    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      alert('PDF file is too large. Please use a PDF under 500KB or use the "paste text manually" option.');
      return;
    }

    setLoading(true);

    try {
      // Read the file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Extract text from all pages
      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Group text items by line using Y position
        const lines = [];
        let currentLine = { y: null, items: [] };
        
        for (const item of textContent.items) {
          // Get Y position from transform matrix [a, b, c, d, e, f] where e=x, f=y
          const y = item.transform[5];
          const tolerance = 2; // Allow small variations in Y position
          
          if (currentLine.y === null || Math.abs(y - currentLine.y) > tolerance) {
            // New line detected
            if (currentLine.items.length > 0) {
              lines.push(currentLine.items.join(' '));
            }
            currentLine = { y: y, items: [item.str] };
          } else {
            // Same line
            currentLine.items.push(item.str);
          }
        }
        
        // Add the last line
        if (currentLine.items.length > 0) {
          lines.push(currentLine.items.join(' '));
        }
        
        fullText += lines.join('\n') + '\n';
      }

      if (!fullText.trim()) {
        throw new Error('Could not extract text from PDF. The PDF may be image-based. Please use the "paste text manually" option.');
      }

      // Parse the extracted text
      const parsed = parseScript(fullText);
      onScriptParsed(parsed);
      
      // Reset the file input
      e.target.value = '';
    } catch (error) {
      alert(`Error processing PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #313973 0%, #295294 50%, #3962b4 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Map className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Pokerogue Script Helper</h1>
            <p className="text-white/70">Upload a daily run script PDF or paste the text</p>
          </div>

          <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-xl p-12 text-center hover:bg-white/10 transition cursor-pointer">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
              disabled={loading}
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white font-semibold">Processing...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload className="w-16 h-16 text-white/60" />
                  <div>
                    <p className="text-white font-semibold text-lg mb-1">Upload Daily Script PDF</p>
                    <p className="text-white/60 text-sm">Click to browse or drag and drop</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div className="text-center my-4">
            <button
              onClick={() => setShowManual(!showManual)}
              className="text-white/70 hover:text-white text-sm underline"
            >
              Or paste script text manually
            </button>
          </div>

          {showManual && (
            <div className="bg-white/5 rounded-xl p-4">
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Paste the entire script text here..."
                className="w-full h-64 bg-black/20 border border-white/20 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 resize-y font-mono text-sm"
                style={{ borderColor: '#3962b4' }}
              />
              <button
                onClick={handleManualParse}
                disabled={loading}
                className="w-full mt-4 text-white py-3 rounded-lg font-semibold transition"
                style={{ background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #3962b4 0%, #295294 100%)' }}
              >
                {loading ? 'Parsing...' : 'Parse Script'}
              </button>
            </div>
          )}

          <div className="mt-8 rounded-lg p-4" style={{ backgroundColor: 'rgba(57, 98, 180, 0.2)', borderColor: 'rgba(57, 98, 180, 0.3)', borderWidth: '1px' }}>
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              What is a daily script?
            </h3>
            <p className="text-white/80 text-sm mb-3">
              A daily script is a detailed walkthrough showing every action needed to complete that day's challenge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

