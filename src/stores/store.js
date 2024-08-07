import { create } from 'zustand'

const useStore = create((set) => ({
  resultState: "WAITING", // WAITING, LOADING, ABORT, ERROR
  resultContent: null,

  receiptList: [],

  categoryTotals: {},

  setResultState: (newState) => set((state) => ({ resultState: newState })),
  setResultContent: (newContent) => set((state) => ({ resultContent: newContent })),
  
  /**
   * 
   * @param newReceipt: Receipt obj
   */
  addReceipt: (newReceipt) => set((state) => ({ receiptList: [...state.receiptList, newReceipt]})),

  setCategoryTotals: (newCategoryTotals) => set((state) => ({ categoryTotals: newCategoryTotals }))
}))

export { useStore }

/**
 * Receipt obj:
 * {
 * }
 */