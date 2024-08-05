import { create } from 'zustand'

const useStore = create((set) => ({
  resultState: "WAITING", // WAITING, LOADING, ABORT, ERROR
  resultContent: null,
  setResultState: (newState) => set((state) => ({ resultState: newState })),
  setResultContent: (newContent) => set((state) => ({ resultContent: newContent }))
}))

export { useStore }