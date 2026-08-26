export default function AdminPage() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-ink mb-4">
          Samir El Gammal — CMS
        </h1>
        <p className="text-muted">
          Run <code className="font-mono text-sm bg-paper px-2 py-1 rounded">npm run dev</code> to
          access the TinaCMS visual editor.
        </p>
      </div>
    </div>
  );
}
