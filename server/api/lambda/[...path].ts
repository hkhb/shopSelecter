export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = config.lambdaBaseUrl

  if (!base) {
    throw createError({
      statusCode: 500,
      statusMessage: 'LAMBDA_URL is not set',
    })
  }

  const rawPath = event.context.params?.path
  const path = Array.isArray(rawPath) ? rawPath.join('/') : (rawPath ?? '')

  const method = getMethod(event)

  let body: any
  try {
    body = await readBody(event)
  } catch {
    body = undefined
  }

  const target = base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')

  try {
    // Lambda のレスポンスをそのまま返す
    return await $fetch(target, {
      method,
      body,
    })
  } catch (err: any) {
    // ここで Lambda 側のステータス/メッセージを拾う
    console.error('lambda proxy error:', err)

    const status = err?.response?.status || 500
    const data = err?.response?._data || { message: 'Lambda error' }

    setResponseStatus(event, status)
    return data
  }
})