import { escapeHtml, sendSalesEmail } from '../utils/email'

export default defineEventHandler(async event => {
  const body = await readBody<{
    name?: string
    email?: string
    petType?: string
    message?: string
  }>(event)

  if (!body?.name || !body?.email || !body?.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Completa nombre, correo y mensaje.'
    })
  }

  const text = [
    'Nuevo mensaje desde Raza & Gourmet',
    '',
    `Nombre: ${body.name}`,
    `Correo: ${body.email}`,
    `Mascota/interés: ${body.petType || 'No indicado'}`,
    '',
    body.message
  ].join('\n')

  await sendSalesEmail({
    subject: `Nuevo lead Raza & Gourmet - ${body.name}`,
    replyTo: body.email,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;color:#1c1917;line-height:1.5">
        <h1>Nuevo lead desde Raza & Gourmet</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Mascota/interés:</strong> ${escapeHtml(body.petType || 'No indicado')}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(body.message)}</p>
      </div>
    `
  })

  return {
    ok: true,
    message: `Gracias, ${body.name}. Recibimos tu solicitud y te responderemos pronto.`
  }
})
