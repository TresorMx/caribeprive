import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import PageWrapper from "@/components/PageWrapper";

// ⚠️ Cambia esto por el dominio real de producción de Caribe Privé.
const SITE_URL = "https://caribeprive.com";
const OG_IMAGE = "/oghome.png"; // 1200×630 — se resuelve contra metadataBase

const DESCRIPTION =
  "Asesoría inmobiliaria de lujo en el Caribe Mexicano. Una sola contraparte durante todo el ciclo de tu propiedad en Cancún, Puerto Morelos y Riviera Maya.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caribe Privé — Asesoría inmobiliaria en el Caribe Mexicano",
    template: "%s — Caribe Privé",
  },
  description: DESCRIPTION,
  applicationName: "Caribe Privé",
  keywords: [
    "Caribe Privé",
    "bienes raíces Caribe Mexicano",
    "inversión inmobiliaria Cancún",
    "propiedades Puerto Morelos",
    "Riviera Maya real estate",
    "preventa departamentos Cancún",
    "asesoría inmobiliaria de lujo",
  ],
  authors: [{ name: "Caribe Privé" }],
  creator: "Caribe Privé",
  publisher: "Caribe Privé",
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/", "en-US": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Caribe Privé",
    title: "Caribe Privé — Asesoría inmobiliaria en el Caribe Mexicano",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "es_MX",
    alternateLocale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Caribe Privé — Real estate advisory en el Caribe Mexicano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caribe Privé — Asesoría inmobiliaria en el Caribe Mexicano",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.png?v=3" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Caribe Privé",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  areaServed: ["Cancún", "Puerto Morelos", "Riviera Maya", "Quintana Roo, México"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cancún",
    addressRegion: "Quintana Roo",
    addressCountry: "MX",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Barlow+Condensed:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <PageWrapper>{children}</PageWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
