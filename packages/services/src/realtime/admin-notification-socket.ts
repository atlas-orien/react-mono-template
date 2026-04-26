import {
  buildWebSocketUrl,
  createWebSocketClient,
  type WebSocketClientHandle,
} from "./ws-client"
import type {
  AdminWsServerMessage,
  WsConnectedMessage,
  WsErrorMessage,
  WsNotificationMessage,
  WsPongMessage,
} from "./ws-types"

export interface AdminNotificationSocketOptions {
  token: string
  baseHttpUrl?: string | null
  path?: string
  pingIntervalMs?: number
  onConnected?: (message: AdminWsServerMessage) => void
  onPong?: (message: WsPongMessage) => void
  onNotification?: (message: WsNotificationMessage) => void
  onErrorMessage?: (message: AdminWsServerMessage) => void
  onUnknownMessage?: (message: AdminWsServerMessage) => void
  onOpen?: () => void
  onClose?: (event: CloseEvent) => void
  onSocketError?: (event: Event) => void
}

export interface AdminNotificationSocketHandle {
  connect: () => WebSocket
  disconnect: () => void
  sendPing: () => boolean
  getSocket: WebSocketClientHandle["getSocket"]
}

export function createAdminNotificationSocket({
  token,
  baseHttpUrl,
  path = "/api/ws",
  pingIntervalMs = 30_000,
  onConnected,
  onPong,
  onNotification,
  onErrorMessage,
  onUnknownMessage,
  onOpen,
  onClose,
  onSocketError,
}: AdminNotificationSocketOptions): AdminNotificationSocketHandle {
  let pingTimer: ReturnType<typeof globalThis.setInterval> | null = null

  const clearPingTimer = () => {
    if (pingTimer == null) {
      return
    }

    globalThis.clearInterval(pingTimer)
    pingTimer = null
  }

  const startPingTimer = (socket: WebSocket) => {
    clearPingTimer()

    pingTimer = globalThis.setInterval(() => {
      if (socket.readyState !== WebSocket.OPEN) {
        clearPingTimer()
        return
      }

      socket.send(JSON.stringify({ type: "ping" }))
    }, pingIntervalMs)
  }

  const client = createWebSocketClient({
    url: buildWebSocketUrl({
      path,
      token,
      baseHttpUrl,
    }),
    onOpen(event, socket) {
      onOpen?.()
      socket.send(JSON.stringify({ type: "ping" }))
      startPingTimer(socket)
      void event
    },
    onMessage(event) {
      const message = parseAdminWsMessage(event.data)

      if (!message) {
        return
      }

      switch (message.type) {
        case "connected":
          onConnected?.(message as WsConnectedMessage)
          return
        case "pong":
          onPong?.(message as WsPongMessage)
          return
        case "notification":
          onNotification?.(message as WsNotificationMessage)
          return
        case "error":
          onErrorMessage?.(message as WsErrorMessage)
          return
        default:
          onUnknownMessage?.(message)
      }
    },
    onError(event) {
      onSocketError?.(event)
    },
    onClose(event) {
      clearPingTimer()
      onClose?.(event)
    },
  })

  return {
    connect: client.connect,
    disconnect() {
      clearPingTimer()
      client.disconnect(1000, "admin shell cleanup")
    },
    sendPing() {
      return client.sendText(JSON.stringify({ type: "ping" }))
    },
    getSocket: client.getSocket,
  }
}

function parseAdminWsMessage(raw: string): AdminWsServerMessage | null {
  try {
    return JSON.parse(raw) as AdminWsServerMessage
  } catch {
    return null
  }
}
