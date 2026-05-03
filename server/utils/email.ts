interface EmailPayload {
  subject: string
  html: string
  text: string
  replyTo?: string
}

type RuntimeEnv = Record<string, unknown>

export const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const getCloudflareEnv = (event?: { context?: Record<string, any> }): RuntimeEnv => {
  const context = event?.context || {}
  return (
    context._platform?.cloudflare?.env ||
    context.cloudflare?.env ||
    (globalThis as typeof globalThis & { __env__?: RuntimeEnv }).__env__ ||
    {}
  )
}

const getEnvValue = (env: RuntimeEnv, keys: string[]) => {
  for (const key of keys) {
    if (env[key]) {
      return String(env[key])
    }
  }

  return ''
}

export const sendSalesEmail = async (payload: EmailPayload, event?: { context?: Record<string, any> }) => {
  const config = useRuntimeConfig(event)
  const env = getCloudflareEnv(event)
  const apiKey = String(config.resendApiKey || '') || getEnvValue(env, ['NUXT_RESEND_API_KEY', 'RESEND_API_KEY'])
  const salesEmail = String(config.salesEmail || '') || getEnvValue(env, ['NUXT_SALES_EMAIL', 'SALES_EMAIL'])
  const fromEmail =
    String(config.fromEmail || '') ||
    getEnvValue(env, ['NUXT_FROM_EMAIL', 'FROM_EMAIL']) ||
    'Raza & Gourmet <onboarding@resend.dev>'

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
