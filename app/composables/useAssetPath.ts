export const useAssetPath = () => {
  const config = useRuntimeConfig()
  const baseURL = String(config.app.baseURL || '/')

  return (path: string) => {
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('#')) {
      return path
    }

    const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
    const assetPath = path.startsWith('/') ? path : `/${path}`

    return base ? `${base}${assetPath}` : assetPath
  }
}
