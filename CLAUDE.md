# Caribe Privé — Guía del proyecto (para Claude / desarrollo)

Microsite inmobiliario de **Caribe Privé**, asesoría en el Caribe Mexicano
(Cancún, Puerto Morelos, Riviera Maya). Bilingüe ES/EN, con **chatbot con IA que
agenda citas**, integración a **GoHighLevel (CRM)**, Google Maps y páginas de
contenido con SEO.

> Nota histórica: el proyecto nació de una plantilla "Newstate Realty" y se
> rebrandeó por completo a Caribe Privé. Si ves "Newstate" en algún lado, es un
> resto y debe decir "Caribe Privé".

---

## Stack

- **Next.js 14.2.15** — App Router, **JavaScript/JSX (NO TypeScript)**
- **Tailwind CSS 3** — paleta y fuentes en `tailwind.config.js` + `app/globals.css`
- **Framer Motion** — animaciones
- **@anthropic-ai/sdk** — chatbot (modelo `claude-sonnet-4-6`)
- Node 18+ (probado en 26)

## Correr en local

```bash
npm install
cp .env.example .env.local     # y llena las keys (ver abajo)
npm run dev                    # http://localhost:3000
```

Producción: `npm run build && npm start`.

> Si el `node_modules` viene de otra máquina, bórralo y reinstala.
> Sin las keys el sitio funciona igual: el chat dirá "no configurado", GHL se
> omite y el mapa muestra un aviso — nada se rompe.

## Variables de entorno (`.env.local` en local, y en Vercel para producción)

| Variable | Para qué | Notas |
|---|---|---|
| `ANTHROPIC_API_KEY` | Chatbot | `sk-ant-...` (console.anthropic.com) |
| `GHL_API_KEY` | Enviar leads/citas a GHL | Private Integration token (Contacts + Calendars) |
| `GHL_LOCATION_ID` | Subcuenta de GHL | Settings → Business Profile |
| `GHL_CALENDAR_ID` | Agendar citas | Calendars → [calendario] → Settings |
| `GHL_ASSIGNED_USER_ID` | (Opcional) asignar usuario | En calendario **round robin** déjala VACÍA |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Mapas | `AIza...` (única que se expone al navegador) |

`.env.local` está en `.gitignore` (no se sube). En Vercel: Settings → Environment
Variables + **Redeploy** (las `NEXT_PUBLIC_*` se hornean en el build).

---

## Estructura

```
app/
  layout.jsx                 metadata/SEO global, JSON-LD, fuentes, SITE_URL
  page.jsx                   home (Hero, Problem, Pledge, Fronts, Properties, Market, CTA)
  agendar/page.jsx           formulario de cita standalone
  propiedades/page.jsx       listado de propiedades con filtros
  propiedades/[slug]/page.jsx  landing de cada desarrollo (estática por slug)
  guia-inversionista/ zonas/ como-trabajamos/ nosotros/   páginas de contenido (SEO)
  api/chat/route.js          chatbot (Anthropic) + captura de lead
  api/chat-lead/route.js     guarda el lead del formulario del chat en GHL
  api/submit-appointment/route.js  crea contacto + cita en GHL
components/
  Nav, Hero, Footer, Chat, ChatScheduler, PropertyView, PropertyMap,
  AppointmentForm, LanguageProvider, Reveal, ...
  content/                   páginas de contenido + ui.jsx (PageHero, Section, CTABand, ImageBand, BarChart, FaqList, Icons)
  ui/background-gradient-animation.jsx   fondo animado (sección 02 y loader)
lib/
  properties.js              ARCHIVO DE DATOS de propiedades (fuente de verdad)
  i18n.js                    diccionario bilingüe { es, en }
  ghl.js                     helper de GoHighLevel (contactos, citas, notas)
public/                      imágenes (fotos en WebP; articulos/ = fotos del destino)
```

## Cómo agregar contenido

- **Propiedad nueva**: copia un objeto en `lib/properties.js`, cambia `slug`,
  textos, imágenes y datos. La **card** (home y `/propiedades`) y la **landing**
  (`/propiedades/<slug>`) se generan solas. Cada texto es `{ es, en }`.
- **Textos del sitio**: `lib/i18n.js` (diccionario bilingüe). Toggle ES/EN en el
  Nav vía `components/LanguageProvider.jsx` (persiste en localStorage).
- **Marca/paleta**: colores en `tailwind.config.js` (`blue` = slate #344351,
  `yellow` = teal #3FB0A0), logos en `/public` (`logowhite.svg`, `logocolor.svg`).

---

## Integraciones

### Chatbot (`app/api/chat/route.js` + `components/Chat.jsx`)
- Ana Paula Quiroga, asesora experta. Estilo **breve, con datos, objetivo = agendar**.
- **Flujo natural**: descubre primero (¿vivir/rentar/invertir?, zona, presupuesto),
  y cuando es momento emite el marcador interno **`[[BOOK]]`** (se quita del texto,
  la API devuelve `offer: true`) → el chat muestra el **formulario de nombre+teléfono**
  y luego la **mini-agenda** (`ChatScheduler.jsx`) que crea la cita.
- El lead va a GHL vía `/api/chat-lead`; la cita vía `/api/submit-appointment`, y se
  envía la **conversación completa** como contexto (queda en el contacto).

### GoHighLevel (`lib/ghl.js`)
API v2 (`services.leadconnectorhq.com`, versión `2021-07-28`, Bearer token).

- **`createOrUpdateContact`** → usa **`POST /contacts/upsert`** (NO `/contacts/`).
  ⚠️ Crítico: el flujo del chat crea el contacto 2 veces (lead + cita); `/contacts/`
  fallaba por "duplicado" y devolvía `contactId: null`, saltándose la cita. `upsert`
  crea o actualiza. **No cambiar a `/contacts/`.**
- **`createAppointment`** → **`POST /calendars/events/appointments`** (endpoint v2).
  La hora se construye con offset **`-05:00` (America/Cancun)** e `ignoreDateRange: true`.
  ⚠️ Si se manda en UTC, GHL rechaza con *"slot not available"*.
- **Campos personalizados** (deben existir en GHL con estas keys exactas):
  `tipo_de_propiedad_de_inters`, `destino_de_inters` (dropdowns, se manda el slug),
  `presupuesto_del_lead` (Monetary, número), `datos_informativos` (multilínea, resumen/conversación).
- **Tags**: `caribeprive-web` + (`appointment-request` o `chatbot-lead`).
  **Source**: "Caribe Privé - Formulario Cita" / "Caribe Privé - Chatbot Web".
- El calendario es **round robin** → asigna sola la cita a un asesor. El *owner del
  contacto* es aparte (se maneja con un Workflow de GHL, aún pendiente).

### Google Maps (`components/PropertyMap.jsx`)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. Solo aparece en las **landings de propiedad**.
  Restringir la key por dominio (HTTP referrers) en Google Cloud.

---

## Deployment

- **Repo**: GitHub `TresorMx/caribeprive` → cada push a `main` **auto-deploya en Vercel**.
- **Dominio**: `caribeprive.com` (apex principal; `www` redirige al apex).
- **SEO**: `SITE_URL` en `app/layout.jsx` (= `https://caribeprive.com`). Open Graph
  usa `/public/oghome.png` (1200×630). Cada página tiene su `metadata`.

## Aprendizajes / gotchas (no repetir estos bugs)

1. **GHL contactos** → `/contacts/upsert`, nunca `/contacts/` (duplicados).
2. **GHL citas** → endpoint `/calendars/events/appointments` + hora con offset
   `-05:00` de Cancún + `ignoreDateRange: true`.
3. **Custom fields de GHL** deben existir con las keys exactas o la data no cae.
4. **Fotos de asesoras** (Hero) rotan por **opacidad con ambas imágenes montadas**,
   NO con `key`+remount (en Safari mostraba la imagen en blanco al cargar).
5. **Imágenes**: fotos pesadas en **WebP**; below-the-fold con `loading="lazy"`.
6. **Mensajes de WhatsApp** sin emoji (varios se veían como `?` en Android).
7. El **preloader** (`PageWrapper` → `Preloader`) se muestra una vez por carga completa.

## Pendientes / ideas

- Workflows en GHL: confirmación automática al cliente (WhatsApp/SMS/email) y
  asignar el *owner* del contacto = usuario de la cita.
- Segundo filtro (tipo/preventa) o buscador en `/propiedades`.
- Botón "Copiar resumen" para el cliente en el formulario de cita.
