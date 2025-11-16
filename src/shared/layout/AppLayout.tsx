export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-shell">
      <div className="app-wrapper">
        {children}
      </div>
    </div>
  );
}
