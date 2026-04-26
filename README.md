# Raza & Gourmet

Landing comercial en Nuxt 4 para captar pedidos de snacks, heladitos y detalles gourmet para mascotas. La pagina esta pensada mobile-first, con catalogo, carrito, pedido por WhatsApp y envio opcional de correos a la fuerza de ventas.

## Setup

Instala dependencias:

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` para desarrollo local y configura estos valores tambien en Netlify:

```env
NUXT_PUBLIC_SITE_URL=https://tudominio.com
RESEND_API_KEY=
SALES_EMAIL=ventas@tudominio.com
FROM_EMAIL=Raza & Gourmet <ventas@tudominio.com>
```

`RESEND_API_KEY` activa el envio de correos de pedidos y formularios. Si no esta configurado, la pagina sigue funcionando y abre el pedido por WhatsApp.

## Desarrollo

Servidor local:

```bash
npm run dev
```

## Production

Construir para produccion:

```bash
npm run build
```

El build optimiza imagenes antes de compilar. La configuracion actual esta preparada para Netlify.

## Scripts

```bash
npm run dev              # desarrollo
npm run build            # build Netlify
npm run generate         # generacion estatica
npm run optimize:images  # optimiza imagenes publicas
```
