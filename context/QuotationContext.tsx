'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface QuotationItem {
  id: string
  name: string
  category: string
  quantity: number
}

interface QuotationContextType {
  items: QuotationItem[]
  addItem: (item: QuotationItem) => void
  removeItem: (id: string) => void
  clearItems: () => void
  updateQuantity: (id: string, quantity: number) => void
}

const QuotationContext = createContext<QuotationContextType | undefined>(undefined)

export function QuotationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuotationItem[]>([])

  const addItem = (item: QuotationItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearItems = () => {
    setItems([])
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      )
    }
  }

  return (
    <QuotationContext.Provider value={{ items, addItem, removeItem, clearItems, updateQuantity }}>
      {children}
    </QuotationContext.Provider>
  )
}

export function useQuotation() {
  const context = useContext(QuotationContext)
  if (context === undefined) {
    throw new Error('useQuotation must be used within a QuotationProvider')
  }
  return context
}
