import { useMemo, useState } from "react"
import {
  deleteWithSignedUrlApi,
  getAccessSignApi,
  getDeleteSignApi,
  getUploadDocumentSignApi,
  getUploadImageSignApi,
  uploadWithSignedUrlApi,
} from "@/api"

type UploadKind = "image" | "document"

interface UploadState {
  key: string
  uploadUrl: string
  accessUrl?: string
  deleted?: boolean
}

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif"])
const DOC_EXTS = new Set(["pdf", "doc", "docx", "xls", "xlsx", "txt", "md"])

function getFileExt(file: File): string {
  const fileName = file.name || ""
  const idx = fileName.lastIndexOf(".")
  if (idx < 0 || idx === fileName.length - 1) return ""
  return fileName.slice(idx + 1).toLowerCase()
}

export default function S3UploadPanel() {
  const [activeTab, setActiveTab] = useState<UploadKind>("image")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [records, setRecords] = useState<
    Partial<Record<UploadKind, UploadState>>
  >({})

  const current = records[activeTab]

  const title = useMemo(() => {
    if (activeTab === "image") return "Image"
    return "Document"
  }, [activeTab])

  const handleUpload = async (file: File) => {
    setLoading(true)
    setMessage("")
    try {
      let key = ""
      let uploadUrl = ""

      if (activeTab === "image") {
        const ext = getFileExt(file)
        if (!IMAGE_EXTS.has(ext)) {
          throw new Error(`image ext not supported: ${ext || "<empty>"}`)
        }
        const sign = await getUploadImageSignApi({ ext })
        await uploadWithSignedUrlApi(file, sign)
        key = sign.key
        uploadUrl = sign.upload_url
      }

      if (activeTab === "document") {
        const ext = getFileExt(file)
        if (!DOC_EXTS.has(ext)) {
          throw new Error(`document ext not supported: ${ext || "<empty>"}`)
        }
        const sign = await getUploadDocumentSignApi({ ext })
        await uploadWithSignedUrlApi(file, sign)
        key = sign.key
        uploadUrl = sign.upload_url
      }

      setRecords((prev) => ({
        ...prev,
        [activeTab]: {
          key,
          uploadUrl,
          deleted: false,
        },
      }))
      setMessage(`${title} upload success`)
    } catch (err) {
      const text = err instanceof Error ? err.message : String(err)
      setMessage(`${title} upload failed: ${text}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAccessSign = async () => {
    if (!current?.uploadUrl) return
    setLoading(true)
    setMessage("")
    try {
      const res = await getAccessSignApi({ key: current.key })
      setRecords((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          accessUrl: res.download_url,
        } as UploadState,
      }))
      setMessage(`${title} access sign success`)
    } catch (err) {
      const text = err instanceof Error ? err.message : String(err)
      setMessage(`${title} access sign failed: ${text}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSign = async () => {
    if (!current?.uploadUrl) return
    setLoading(true)
    setMessage("")
    try {
      const sign = await getDeleteSignApi({ key: current.key })
      await deleteWithSignedUrlApi(sign)
      setRecords((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          deleted: true,
        } as UploadState,
      }))
      setMessage(`${title} delete success`)
    } catch (err) {
      const text = err instanceof Error ? err.message : String(err)
      setMessage(`${title} delete failed: ${text}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-(--app-border) bg-(--app-surface) p-5 shadow-(--ui-shadow-soft)">
      <div className="flex flex-wrap gap-2">
        {(["image", "document"] as UploadKind[]).map((tab) => (
          <button
            key={tab}
            type="button"
            disabled={loading}
            onClick={() => setActiveTab(tab)}
            className={`inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
              activeTab === tab
                ? "border-(--primary) bg-(--primary) text-(--primary-foreground)"
                : "border-(--app-border) bg-transparent text-(--app-text) hover:bg-(--app-active-bg)"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-(--app-text)">
            Upload {title}
          </label>
          <input
            type="file"
            disabled={loading}
            accept={
              activeTab === "image"
                ? "image/*"
                : ".pdf,.doc,.docx,.xls,.xlsx,.txt,.md"
            }
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              void handleUpload(file)
              e.currentTarget.value = ""
            }}
            className="block w-full cursor-pointer rounded-lg border border-(--app-border) bg-transparent px-3 py-2 text-sm text-(--app-text) file:mr-3 file:rounded-md file:border-0 file:bg-(--primary) file:px-3 file:py-2 file:text-sm file:font-medium file:text-(--primary-foreground) hover:file:opacity-90"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={loading || !current?.uploadUrl}
            onClick={() => void handleAccessSign()}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-(--app-border) px-4 text-sm font-medium text-(--app-text) transition hover:bg-(--app-active-bg) disabled:cursor-not-allowed disabled:opacity-60"
          >
            Get Access Sign
          </button>
          <button
            type="button"
            disabled={loading || !current?.uploadUrl}
            onClick={() => void handleDeleteSign()}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-(--destructive) px-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete By Sign
          </button>
        </div>

        {message ? (
          <p className="text-sm text-(--app-muted-text)">{message}</p>
        ) : null}

        {current?.key ? (
          <div className="rounded-xl border border-(--app-border) bg-black/10 p-4 text-sm text-(--app-text)">
            <p className="break-all">
              <span className="font-semibold">key:</span> {current.key}
            </p>
            <p className="break-all">
              <span className="font-semibold">uploadUrl:</span>{" "}
              {current.uploadUrl}
            </p>
            {current.accessUrl ? (
              <p className="break-all">
                <span className="font-semibold">accessUrl:</span>{" "}
                {current.accessUrl}
              </p>
            ) : null}
            <p>
              <span className="font-semibold">deleted:</span>{" "}
              {current.deleted ? "yes" : "no"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
