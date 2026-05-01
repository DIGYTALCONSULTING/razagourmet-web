import { escapeHtml, sendSalesEmail } from '../utils/email'

export default defineEventHandler(async event => {
  const body = await readBody<{
    name?: string
    email?: string
    phone?: string
    interest?: string
    message?: string
    consent?: boolean
  }>(event)

  if (!body?.name || !body?.phone || !body?.message || !body?.consent) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Completa nombre, celular, mensaje y autorización de datos.'
    })
  }

  const text = [
    'Nuevo mensaje desde Raza & Gourmet',
    '',
    `Nombre: ${body.name}`,
    `Celular/WhatsApp: ${body.phone}`,
    `Correo: ${body.email || 'No indicado'}`,
    `Mascota/interés: ${body.interest || 'No indicado'}`,
    `Autorizó tratamiento de datos: ${body.consent ? 'Sí' : 'No'}`,
    '',
    body.message
  ].join('\n')

  const result = await sendSalesEmail({
    subject: `Nuevo lead Raza & Gourmet - ${body.name}`,
    replyTo: body.email,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;color:#1c1917;line-height:1.5">
        <h1>Nuevo lead desde Raza & Gourmet</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Celular/WhatsApp:</strong> ${escapeHtml(body.phone)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(body.email || 'No indicado')}</p>
        <p><strong>Mascota/interés:</strong> ${escapeHtml(body.interest || 'No indicado')}</p>
        <p><strong>Autorizó tratamiento de datos:</strong> ${body.consent ? 'Sí' : 'No'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(body.message)}</p>
      </div>
    `
  })

  return {
    ok: true,
    emailSent: result.sent,
    message: result.sent
      ? `Gracias, ${body.name}. Recibimos tu solicitud y te responderemos pronto.`
      : `Gracias, ${body.name}. Recibimos tu solicitud. Configura Resend para activar el correo automático.`
  }
})
