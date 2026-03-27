import { reactive } from 'vue'
import { nanocatEnUS } from './locales/en-US'
import { nanocatZhCN } from './locales/zh-CN'

export type NanocatLocale = {
  formFieldRequiredText: string
  selectMenuPlaceholder: string
  selectMenuSelectedIndicatorText: string
  selectMenuSelectedCountText: string
  statusDetailTitle: string
  statusDetailLabel: string
  statusDetailRawErrorLabel: string
  viewModeListLabel: string
  viewModeCardsLabel: string
}

const localeState = reactive<NanocatLocale>({ ...nanocatEnUS })

export function useNanocatLocale(): Readonly<NanocatLocale> {
  return localeState
}

export function setNanocatLocale(next: Partial<NanocatLocale>): void {
  Object.assign(localeState, next)
}

export function resetNanocatLocale(): void {
  Object.assign(localeState, nanocatEnUS)
}

export { nanocatEnUS, nanocatZhCN }
