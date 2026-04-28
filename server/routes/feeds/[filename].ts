import { defineEventHandler, setHeader, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { filename } = event.context.params!
  const { feedsBase, feedsDomain } = useRuntimeConfig()

  const backendUrl = `${feedsBase}feeds/${filename}`

  const response = await $fetch.raw(backendUrl, {
    responseType: 'arrayBuffer',
    headers: {
      Domain: feedsDomain,
    },
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 502,
      statusMessage: 'Failed to fetch feed from backend',
    })
  })

  const body = response._data as ArrayBuffer

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return Buffer.from(body)
})
