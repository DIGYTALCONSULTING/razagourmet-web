interface EmailPayload {
  subject: string
  html: string
  text: string
  replyTo?: string
}

export const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export const sendSalesEmail = async (payload: EmailPayload) => {
  const config = useRuntimeConfig()
  const apiKey = String(config.resendApiKey || '')
  const salesEmail = String(config.salesEmail || '')
  const fromEmail = String(config.fromEmail || 'Raza & Gourmet <onboarding@resend.dev>')

  if (!apiKey || !salesEmail) {
    return {
      sent: false,
      reason: 'Email provider is not configured.'
    }
  }

  const response = await $fetch<{ id?: string }>('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: {
      from: fromEmail,
      to: [salesEmail],
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text
    }
  })

  return {
    sent: true,
    id: response.id
  }
}
