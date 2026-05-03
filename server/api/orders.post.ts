import { escapeHtml, sendSalesEmail } from '../utils/email'

interface OrderItem {
  productName?: string
  variantName?: string
  price?: number
  quantity?: number
}

export default defineEventHandler(async event => {
  const body = await readBody<{
    customer?: {
      name?: string
      phone?: string
      city?: string
      deliveryPreference?: string
      notes?: string
    }
    items?: OrderItem[]
    subtotal?: number
    whatsappMessage?: string
  }>(event)

  const customer = body.customer || {}
  const items = Array.isArray(body.items) ? body.items : []

  if (!customer.name || !customer.phone || !customer.city || items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Completa nombre, WhatsApp, ciudad y al menos un producto.'
    })
  }

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  })

  const itemsHtml = items
    .map(item => {
      const quantity = Number(item.quantity || 0)
      const price = Number(item.price || 0)
      return `<li><strong>${escapeHtml(item.productName)}</strong> - ${escapeHtml(item.variantName)} x${quantity} (${formatter.format(price * quantity)})</li>`
    })
    .join('')

  const text = [
    'Nuevo pedido asistido - Raza & Gourmet',
    '',
    `Nombre: ${customer.name}`,
    `WhatsApp: ${customer.phone}`,
    `Ciudad/zona: ${customer.city}`,
    `Entrega: ${customer.deliveryPreference || 'No indicada'}`,
    '',
    'Productos:',
    ...items.map((item, index) => {
      const quantity = Number(item.quantity || 0)
      const price = Number(item.price || 0)
      return `${index + 1}. ${item.productName} - ${item.variantName} x${quantity} (${formatter.format(price * quantity)})`
    }),
    '',
    `Subtotal de referencia: ${formatter.format(Number(body.subtotal || 0))}`,
    customer.notes ? `Notas: ${customer.notes}` : '',
    '',
    'Mensaje WhatsApp:',
    body.whatsappMessage || ''
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1c1917;line-height:1.5">
      <h1>Nuevo pedido asistido</h1>
      <p><strong>Nombre:</strong> ${escapeHtml(customer.name)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(customer.phone)}</p>
      <p><strong>Ciudad/zona:</strong> ${escapeHtml(customer.city)}</p>
      <p><strong>Entrega:</strong> ${escapeHtml(customer.deliveryPreference || 'No indicada')}</p>
      <h2>Productos</h2>
      <ul>${itemsHtml}</ul>
      <p><strong>Subtotal de referencia:</strong> ${formatter.format(Number(body.subtotal || 0))}</p>
      ${customer.notes ? `<p><strong>Notas:</strong> ${escapeHtml(customer.notes)}</p>` : ''}
      <h2>Mensaje para WhatsApp</h2>
      <pre style="white-space:pre-wrap;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:16px">${escapeHtml(body.whatsappMessage || '')}</pre>
    </div>
  `

  const result = await sendSalesEmail(
    {
      subject: `Nuevo pedido Raza & Gourmet - ${customer.name}`,
      html,
      text
    },
    event
  )

  return {
    ok: true,
    emailSent: result.sent,
    message: result.sent
      ? 'Pedido enviado a ventas. También abriremos WhatsApp para continuar la conversación.'
      : 'Pedido preparado. Configura RESEND_API_KEY y SALES_EMAIL para enviar correos automáticos; continuamos por WhatsApp.'
  }
})
