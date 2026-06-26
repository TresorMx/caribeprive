import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import PropertiesListing from "@/components/content/PropertiesListing";

export const metadata = {
  title: "Propiedades",
  description:
    "Desarrollos inmobiliarios seleccionados en el Caribe Mexicano: Cancún, Puerto Morelos y Riviera Maya. Explora los proyectos y agenda una visita con Caribe Privé.",
  alternates: { canonical: "/propiedades" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <PropertiesListing />
      <Footer />
      <Chat />
    </>
  );
}
