export const useWhatsAppOrder = () => {
  const config = useRuntimeConfig()
  const { items, subtotal } = useCart()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(value)

  const buildMessage = (customer?: {
    name?: string
    phone?: string
    city?: string
    deliveryPreference?: string
    notes?: string
  }) => {
    const lines = [
      `Hola, quiero hacer un pedido asistido con ${config.public.brandName}.`,
      ''
    ]

    if (customer?.name || customer?.phone || customer?.city) {
      lines.push('Datos del cliente:')
      if (customer.name) lines.push(`Nombre: ${customer.name}`)
      if (customer.phone) lines.push(`Teléfono: ${customer.phone}`)
      if (customer.city) lines.push(`Ciudad/zona: ${customer.city}`)
      if (customer.deliveryPreference) lines.push(`Entrega: ${customer.deliveryPreference}`)
      lines.push('')
    }

    lines.push('Resumen del carrito:')

    items.value.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.productName} - ${item.variantName} x${item.quantity} (${formatCurrency(item.price * item.quantity)})`
      )
    })

    lines.push('', `Subtotal de referencia: ${formatCurrency(subtotal.value)}`, '')
    if (customer?.notes) {
      lines.push(`Notas: ${customer.notes}`, '')
    }
    lines.push('Quedo atento a disponibilidad, cobertura y confirmacion final. Gracias.')

    return lines.join('\n')
  }

  const getWhatsAppUrl = (customer?: Parameters<typeof buildMessage>[0]) => {
    const phone = String(config.public.whatsappNumber || '').replace(/\D/g, '')
    return `https://wa.me/${phone}?text=${encodeURIComponent(buildMessage(customer))}`
  }

  const whatsappUrl = computed(() => getWhatsAppUrl())

  const openWhatsAppOrder = (customer?: Parameters<typeof buildMessage>[0]) => {
    if (!import.meta.client) {
      return
    }

    window.open(getWhatsAppUrl(customer), '_blank', 'noopener,noreferrer')
  }

  return {
    buildMessage,
    getWhatsAppUrl,
    whatsappUrl,
    openWhatsAppOrder,
    formatCurrency
  }
}
