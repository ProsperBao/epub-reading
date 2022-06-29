export function useToggleOutside(fn?: () => void) {
  const [open, toggleOpen] = useToggle(false)
  const targetRef = ref(null)
  onClickOutside(targetRef, (e) => {
    e.stopPropagation()
    toggleOpen()
  })
  return {
    open,
    toggleOpen: () => {
      toggleOpen()
      open.value && fn?.()
    },
    targetRef,
  }
}
