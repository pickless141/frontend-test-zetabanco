import ContenedorPrincipal from "@/app/components/layout/ContenedorPrincipal";
import EncabezadoPagina from "@/app/components/layout/EncabezadoPagina";
import Navbar from "@/app/components/layout/Navbar";

type PanelLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <ContenedorPrincipal>
        <EncabezadoPagina />
        <Navbar />
        {children}
      </ContenedorPrincipal>
    </main>
  );
}