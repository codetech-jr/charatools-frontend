import { sendGAEvent } from '@next/third-parties/google'
import type { CatalogProduct } from './catalog.types'
import type { QuotationItem } from '@/store/quotationStore'

export const trackWhatsAppLead = (source: 'fab' | 'drawer', items: (CatalogProduct | QuotationItem)[]) => {
  if (process.env.NODE_ENV !== 'production') return;

  sendGAEvent('event', 'generate_lead', {
    currency: 'USD',
    value: 0,
    lead_source: source,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: 'categoryLabel' in item ? item.categoryLabel : 'Cotización',
      item_brand: item.brand
    }))
  })
}

export const trackAddToQuote = (product: CatalogProduct) => {
  if (process.env.NODE_ENV !== 'production') return;

  sendGAEvent('event', 'add_to_quote', {
    item_id: product.id,
    item_name: product.name,
    item_category: product.categoryLabel,
    item_brand: product.brand
  })
}

export const trackSelectCategory = (categorySlug: string) => {
  if (process.env.NODE_ENV !== 'production') return;

  sendGAEvent('event', 'select_item', {
    item_list_name: 'mega-menu',
    item_category: categorySlug
  })
}

export const trackCasheaClick = (location: string) => {
  if (process.env.NODE_ENV !== 'production') return;
  sendGAEvent('event', 'click_cashea', { location })
}
