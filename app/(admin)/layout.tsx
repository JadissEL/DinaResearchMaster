export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-beige-100">
      <div className="border-b border-black/10 bg-white px-6 py-4">
        <a href="/" className="font-ui text-sm font-bold uppercase tracking-wider text-black">
          DinaResearch Admin
        </a>
      </div>
      {children}
    </div>
  );
}
