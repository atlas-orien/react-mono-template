import { createPortal } from "react-dom"
import Cropper from "react-easy-crop"
import type { Area, Point } from "react-easy-crop"
import "react-easy-crop/react-easy-crop.css"

interface ImageCropperModalProps {
  open: boolean
  imageUrl: string
  crop: Point
  zoom: number
  minZoom?: number
  maxZoom?: number
  confirming?: boolean
  onCropChange: (value: Point) => void
  onZoomChange: (value: number) => void
  onCropComplete: (areaPixels: Area) => void
  onCancel: () => void
  onConfirm: () => void
  title?: string
  description?: string
  zoomLabel?: string
  cancelLabel?: string
  confirmLabel?: string
  confirmingLabel?: string
}

export default function ImageCropperModal({
  open,
  imageUrl,
  crop,
  zoom,
  minZoom = 1,
  maxZoom = 4,
  confirming = false,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onCancel,
  onConfirm,
  title = "Adjust Image",
  description = "Drag and zoom. The circle is the visible area.",
  zoomLabel = "Zoom",
  cancelLabel = "Cancel",
  confirmLabel = "Save",
  confirmingLabel = "Uploading...",
}: ImageCropperModalProps) {
  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-(--app-border) bg-(--app-surface) p-6 shadow-(--ui-shadow-soft)">
        <h3 className="text-lg font-semibold text-(--app-text)">{title}</h3>
        <p className="mt-2 text-sm text-(--app-muted-text)">{description}</p>

        <div className="relative mt-5 h-80 overflow-hidden rounded-xl border border-(--app-border) bg-black/20">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            objectFit="cover"
            minZoom={minZoom}
            maxZoom={maxZoom}
            cropShape="round"
            showGrid={false}
            classes={{
              containerClassName: "cursor-grab active:cursor-grabbing",
            }}
            style={{
              cropAreaStyle: {
                border: "2px solid rgba(255,255,255,0.95)",
                color: "rgba(0, 0, 0, 0.72)",
              },
            }}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={(_, areaPixels) => onCropComplete(areaPixels)}
          />
        </div>

        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium text-(--app-text)">
            {zoomLabel}
          </label>
          <input
            type="range"
            min={minZoom}
            max={maxZoom}
            step={0.01}
            value={zoom}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="w-full accent-(--primary)"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={confirming}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-(--app-border) px-4 text-sm font-medium text-(--app-text) transition hover:bg-(--app-active-bg) disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirming}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-(--primary) px-4 text-sm font-medium text-(--primary-foreground) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {confirming ? confirmingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
