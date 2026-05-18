import { useState, useRef } from 'react';
import './App.css';
import LineNumberedEditor from './LineNumberedEditor';

/* ──────────────── SVG Icon Components ──────────────── */

function MinifyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Compress / collapse-arrows icon */}
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function BeautifyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Expand / format icon */}
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function OpenFileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Folder-open icon */}
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <polyline points="9 14 12 11 15 14" />
    </svg>
  );
}

function SaveFileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Save / floppy-disk icon */}
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.25s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ──────────────── JSON Panel Component ──────────────── */

interface JsonPanelProps {
  label: string;
  placeholder: string;
  content: string;
  onContentChange: (value: string) => void;
}

function JsonPanel({ label, placeholder, content, onContentChange }: JsonPanelProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---- API calls ---- */
  const handleMinify = async () => {
    if (!content.trim()) return;
    try {
      const response = await fetch('/api/json/minify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: content,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.text();
      onContentChange(data);
    } catch (error) {
      console.error('Error minifying JSON:', error);
    }
  };

  const handleBeautify = async () => {
    if (!content.trim()) return;
    try {
      const response = await fetch('/api/json/beautify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: content,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.text();
      onContentChange(data);
    } catch (error) {
      console.error('Error beautifying JSON:', error);
    }
  };

  /* ---- File open ---- */
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === 'string') onContentChange(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  /* ---- File save ---- */
  const handleSaveFile = () => {
    if (!content.trim()) return;
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ?? 'document.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="json-panel">
      {/* Toolbar */}
      <div className="panel-toolbar">
        <span className="panel-label">{fileName ?? label}</span>

        <div className="panel-actions">
          <button
            className="toolbar-btn"
            onClick={handleOpenFile}
            title="Open JSON file"
          >
            <OpenFileIcon />
          </button>

          <button
            className="toolbar-btn"
            onClick={handleSaveFile}
            title="Save — download JSON file"
          >
            <SaveFileIcon />
          </button>

          <div className="toolbar-separator" />

          <button
            className="toolbar-btn"
            onClick={handleMinify}
            title="Minify — compress JSON to a single line"
          >
            <MinifyIcon />
          </button>

          <button
            className="toolbar-btn"
            onClick={handleBeautify}
            title="Beautify — format JSON with indentation"
          >
            <BeautifyIcon />
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {/* Editor */}
      <LineNumberedEditor
        value={content}
        onChange={onContentChange}
        placeholder={placeholder}
      />
    </div>
  );
}

/* ──────────────── App Root ──────────────── */

function App() {
  const [contentA, setContentA] = useState('');
  const [contentB, setContentB] = useState('');
  const [diffResult, setDiffResult] = useState('');
  const [diffOpen, setDiffOpen] = useState(false);
  const [comparing, setComparing] = useState(false);

  const bothHaveContent = contentA.trim().length > 0 && contentB.trim().length > 0;

  const handleCompare = async () => {
    if (!bothHaveContent) return;
    setComparing(true);
    try {
      const response = await fetch(
        '/api/json/diff?jsonInputB=' + encodeURIComponent(contentB),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: contentA,
        }
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.text();
      setDiffResult(data);
      setDiffOpen(true);
    } catch (error) {
      console.error('Error comparing JSON:', error);
      setDiffResult('Error comparing JSON documents.');
      setDiffOpen(true);
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">JSON Tools</h1>

      <div className="panels-wrapper">
        <JsonPanel
          label="Document 1"
          placeholder="Paste or open a JSON file…"
          content={contentA}
          onContentChange={setContentA}
        />
        <JsonPanel
          label="Document 2"
          placeholder="Paste or open a JSON file…"
          content={contentB}
          onContentChange={setContentB}
        />
      </div>

      {/* Compare button */}
      <div className="compare-section">
        <button
          className={`compare-btn${!bothHaveContent ? ' compare-btn--disabled' : ''}`}
          disabled={!bothHaveContent || comparing}
          onClick={handleCompare}
        >
          {comparing ? 'Comparing…' : 'Compare'}
        </button>
      </div>

      {/* Expandable diff result panel */}
      {diffResult && (
        <div className="diff-panel">
          <div className="diff-panel-header">
            <button
              className="diff-close-btn"
              onClick={() => { setDiffResult(''); setDiffOpen(false); }}
              title="Close comparison result"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              className="diff-toggle-btn"
              onClick={() => setDiffOpen((prev) => !prev)}
            >
              <span>Comparison Result</span>
              <ChevronIcon open={diffOpen} />
            </button>
          </div>

          <div className={`diff-panel-body${diffOpen ? ' diff-panel-body--open' : ''}`}>
            <pre className="diff-content">{diffResult}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;