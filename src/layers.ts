export const OVERLAY_LAYER = Object.freeze({
  modal: 220,
  confirm: 300,
  menu: 1000,
  submenu: 1001,
  toast: 1100,
  tooltip: 1200,
} as const)

export type OverlayLayerName = keyof typeof OVERLAY_LAYER
export type OverlayLayerValue = (typeof OVERLAY_LAYER)[OverlayLayerName]
