import MuktaLanding from "@/components/mukta/MuktaLanding";

const TITLE = "Nada en nuestro cenote — Mukta Residencial";
const DESCRIPTION =
  "Te invitamos a nadar en el cenote privado de Mukta Residencial, Puerto Morelos, con tu familia. Reserva tu día y hora; te enviamos la ubicación por WhatsApp.";

export const metadata = {
  title: { absolute: `${TITLE} · Caribe Privé` },
  description: DESCRIPTION,
  alternates: { canonical: "/mukta" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/mukta",
    images: [{ url: "/mukta/og.jpg", width: 1200, height: 630, alt: "Cenote de Mukta Residencial" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/mukta/og.jpg"] },
};

export default function Page() {
  return <MuktaLanding />;
}
