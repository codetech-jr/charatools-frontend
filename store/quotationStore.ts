/**
 * @file quotationStore.ts
 * @description Cerebro de Estado B2B — CharaTools
 *
 * Gestiona la lista de cotización (sin precios) y la persiste en LocalStorage.
 * Garantía: Si el obrero cierra Chrome y vuelve, su pedido sigue intacto.
 *
 * Arquitectura:
 *   - Zustand v5 con middleware `persist`
 *   - Almacenamiento en `localStorage` bajo la clave `"charatools-quotation"`
 *   - Método `syncToWhatsApp()` genera una URL WhatsApp lista para enviar
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Tipos / Interfaces
// ---------------------------------------------------------------------------

/**
 * Representa un ítem dentro de la lista de cotización.
 * NO incluye precio (decisión B2B deliberada: precio se negocia en WA).
 */
export interface QuotationItem {
  /** Identificador único del producto (slug o SKU) */
  id: string;
  /** Nombre completo del producto tal como aparece en el catálogo */
  name: string;
  /** Nombre de la marca (INGCO, 3M, Stanley, etc.) */
  brand: string;
  /** Referencia/modelo del producto (opcional pero altamente recomendado) */
  reference?: string;
  /** Unidad de medida: "und", "m", "kg", "caja", etc. */
  unit: string;
  /** Cantidad solicitada. Nunca debe ser < 1. */
  qty: number;
  /** Notas adicionales del obrero (voltaje, color, calibre, etc.) */
  notes?: string;
}

/**
 * Datos de contacto del cliente para la cotización.
 * Se persisten en localStorage — no se borran al limpiar la lista.
 */
export interface ContactInfo {
  /** Nombre completo del cliente */
  nombre: string;
  /** Cédula de Identidad o RIF */
  cedula: string;
  /** Sector o zona de entrega */
  sector: string;
}

/**
 * Estado completo del store de cotizaciones.
 */
interface QuotationState {
  /** Lista de ítems en la cotización actual */
  items: QuotationItem[];

  /** Datos de contacto del cliente */
  contactInfo: ContactInfo;

  // -------------------------------------------------------------------------
  // Actions — Mutaciones de Estado
  // -------------------------------------------------------------------------

  /**
   * Añade un producto a la lista.
   * Si el producto ya existe (mismo `id`), SUMA la cantidad al existente.
   * No genera duplicados.
   */
  addItem: (item: Omit<QuotationItem, "qty"> & { qty?: number }) => void;

  /**
   * Resta 1 unidad de un ítem. Si la cantidad llega a 0, elimina el ítem.
   * Nunca permite cantidades negativas (piso cero garantizado).
   */
  decreaseQty: (id: string) => void;

  /**
   * Incrementa en 1 la cantidad de un ítem existente.
   */
  increaseQty: (id: string) => void;

  /**
   * Establece una cantidad exacta para un ítem.
   * Si `qty` es 0 o negativo, elimina el ítem de la lista.
   */
  setQty: (id: string, qty: number) => void;

  /**
   * Actualiza las notas del obrero para un ítem específico.
   */
  setNotes: (id: string, notes: string) => void;

  /**
   * Elimina un ítem específico de la lista.
   */
  removeItem: (id: string) => void;

  /**
   * Vacía la lista completa. Úsese tras confirmar el envío a WhatsApp.
   * NO borra los datos de contacto (nombre, cédula, sector).
   */
  clearQuotation: () => void;

  /**
   * Actualiza un campo individual de contactInfo.
   * Evita re-renders innecesarios al mutar solo el campo cambiado.
   */
  setContactField: <K extends keyof ContactInfo>(field: K, value: ContactInfo[K]) => void;

  // -------------------------------------------------------------------------
  // Computed / Derived
  // -------------------------------------------------------------------------

  /** Número total de ítems distintos en la lista */
  totalItems: () => number;

  /** Cantidad total de unidades sumadas en toda la lista */
  totalUnits: () => number;

  // -------------------------------------------------------------------------
  // UI State — Control de Interfaz
  // -------------------------------------------------------------------------
  
  /** Indica si el carrito lateral (Drawer) está abierto */
  isDrawerOpen: boolean;
  /** Cambia el estado del drawer */
  setDrawerOpen: (open: boolean) => void;

  /**
   * Genera la URL completa de WhatsApp con el mensaje formateado.
   * El mensaje sigue el formato B2B de CharaTools y va URL-encoded.
   *
   * @param waNumber - Número de WhatsApp destino (ej: "584241234567")
   * @returns URL lista para abrir en WhatsApp (wa.me o api.whatsapp.com)
   */
  syncToWhatsApp: (waNumber: string) => string;
}

// ---------------------------------------------------------------------------
// Número de WhatsApp por defecto (se puede sobreescribir al llamar syncToWhatsApp)
// ---------------------------------------------------------------------------
const DEFAULT_WA_NUMBER = "584241234567";

// ---------------------------------------------------------------------------
// Helpers Internos
// ---------------------------------------------------------------------------

/**
 * Formatea un ítem para la lista de texto del mensaje de WhatsApp.
 * Ejemplo: "• INGCO | Taladro Percutor TH-ID 550W (Ref: TH-ID2228VRE) — 2 und"
 */
function formatItem(item: QuotationItem, index: number): string {
  const ref = item.reference ? ` (Ref: ${item.reference})` : "";
  const notes = item.notes ? `\n    📝 ${item.notes}` : "";
  return `${index + 1}. ${item.brand} | ${item.name}${ref} — ${item.qty} ${item.unit}${notes}`;
}

/**
 * Construye el cuerpo del mensaje completo de WhatsApp.
 * Incluye cabecera profesional, lista detallada y CTA de cierre.
 */
function buildWhatsAppMessage(items: QuotationItem[], contact: ContactInfo): string {
  const header = `🛠️ *Hola CharaTools, deseo disponibilidad urgente de lo siguiente:*\n`;
  const separator = `${"─".repeat(35)}\n`;

  // Datos de contacto del cliente
  const contactLines: string[] = [];
  if (contact.nombre.trim()) contactLines.push(`👤 *Nombre:* ${contact.nombre.trim()}`);
  if (contact.cedula.trim()) contactLines.push(`🪪 *Cédula/RIF:* ${contact.cedula.trim()}`);
  if (contact.sector.trim()) contactLines.push(`📍 *Sector:* ${contact.sector.trim()}`);
  const contactBlock = contactLines.length > 0 ? contactLines.join("\n") + "\n" + separator : "";

  const itemList = items.map((item, i) => formatItem(item, i)).join("\n");

  const footer = [
    `\n${separator}`,
    `📦 *Total: ${items.length} producto(s)*`,
    `\n_Por favor confirmar disponibilidad y tiempo de entrega._`,
    `\n¡Gracias! 🤝`,
  ].join("\n");

  return `${header}${separator}${contactBlock}${itemList}${footer}`;
}

// ---------------------------------------------------------------------------
// Store Principal
// ---------------------------------------------------------------------------

export const useQuotationStore = create<QuotationState>()(
  persist(
    (set, get) => ({
      items: [],
      contactInfo: { nombre: '', cedula: '', sector: '' },

      // --- addItem -----------------------------------------------------------
      addItem: (newItem) => {
        const { qty = 1, ...rest } = newItem;
        const safeQty = Math.max(1, qty);

        set((state) => {
          const existing = state.items.find((i) => i.id === rest.id);

          if (existing) {
            // Producto ya en lista: sumar cantidad
            return {
              items: state.items.map((i) =>
                i.id === rest.id ? { ...i, qty: i.qty + safeQty } : i
              ),
            };
          }

          // Producto nuevo: agregar al final
          return {
            items: [...state.items, { ...rest, qty: safeQty }],
          };
        });
      },

      // --- decreaseQty -------------------------------------------------------
      decreaseQty: (id) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          if (item.qty <= 1) {
            // Piso cero: eliminamos el ítem
            return { items: state.items.filter((i) => i.id !== id) };
          }

          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, qty: i.qty - 1 } : i
            ),
          };
        });
      },

      // --- increaseQty -------------------------------------------------------
      increaseQty: (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i
          ),
        }));
      },

      // --- setQty ------------------------------------------------------------
      setQty: (id, qty) => {
        if (qty <= 0) {
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: Math.floor(qty) } : i
          ),
        }));
      },

      // --- setNotes ----------------------------------------------------------
      setNotes: (id, notes) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, notes } : i
          ),
        }));
      },

      // --- removeItem --------------------------------------------------------
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      // --- clearQuotation (NO borra contactInfo) ----------------------------
      clearQuotation: () => {
        set({ items: [] });
      },

      // --- setContactField ---------------------------------------------------
      setContactField: (field, value) => {
        set((state) => ({
          contactInfo: { ...state.contactInfo, [field]: value },
        }));
      },

      // --- totalItems (computed) ---------------------------------------------
      totalItems: () => get().items.length,

      // --- totalUnits (computed) ---------------------------------------------
      totalUnits: () =>
        get().items.reduce((sum, item) => sum + item.qty, 0),

      // --- UI Actions --------------------------------------------------------
      isDrawerOpen: false,
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),

      // --- syncToWhatsApp ----------------------------------------------------
      syncToWhatsApp: (waNumber = DEFAULT_WA_NUMBER) => {
        const { items, contactInfo } = get();

        if (items.length === 0) {
          // Lista vacía: devuelve URL base sin mensaje
          return `https://wa.me/${waNumber}`;
        }

        const message = buildWhatsAppMessage(items, contactInfo);
        const encoded = encodeURIComponent(message);

        // Usar api.whatsapp.com para mayor compatibilidad en móviles Android
        return `https://api.whatsapp.com/send?phone=${waNumber}&text=${encoded}`;
      },
    }),

    // -------------------------------------------------------------------------
    // Configuración del Middleware `persist`
    // -------------------------------------------------------------------------
    {
      name: "charatools-quotation", // Clave en localStorage
      storage: createJSONStorage(() => localStorage),

      /**
       * Versión del schema de persistencia.
       * Si cambiamos la estructura de QuotationItem en el futuro,
       * incrementar esta versión + definir un `migrate()` para datos viejos.
       */
      version: 2,

      /**
       * Persistimos `items` y `contactInfo`. Las funciones (actions) se recrean
       * automáticamente con cada hidratación del store.
       */
      partialize: (state) => ({
        items: state.items,
        contactInfo: state.contactInfo,
      }),

      /**
       * Migración de versiones antiguas del schema.
       * Si un usuario tiene la v0 guardada, la descartamos limpiamente.
       */
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Schema v0 incompatible — empezamos de cero
          return { items: [], contactInfo: { nombre: '', cedula: '', sector: '' } };
        }
        if (version === 1) {
          // Schema v1 → v2: agregar contactInfo
          const old = persistedState as { items: QuotationItem[] };
          return { ...old, contactInfo: { nombre: '', cedula: '', sector: '' } };
        }
        return persistedState as { items: QuotationItem[]; contactInfo: ContactInfo };
      },
    }
  )
);

// ---------------------------------------------------------------------------
// Exports de conveniencia para selectores atómicos (evitan re-renders)
// ---------------------------------------------------------------------------

/** Selector: solo el array de ítems */
export const selectItems = (s: QuotationState) => s.items;

/** Selector: cantidad total de ítems distintos */
export const selectTotalItems = (s: QuotationState) => s.items.length;

/** Selector: suma total de unidades */
export const selectTotalUnits = (s: QuotationState) =>
  s.items.reduce((sum, item) => sum + item.qty, 0);

/** Selector: si la lista tiene al menos un ítem (para mostrar/ocultar el CTA de WA) */
export const selectHasItems = (s: QuotationState) => s.items.length > 0;

/** Selector: busca un ítem por ID (para saber si un producto ya está en la lista) */
export const selectItemById =
  (id: string) =>
  (s: QuotationState): QuotationItem | undefined =>
    s.items.find((item) => item.id === id);
