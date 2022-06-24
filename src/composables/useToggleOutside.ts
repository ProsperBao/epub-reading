export function useToggleOutside() {
  const [open, toggleOpen] = useToggle(false)
  const targetRef = ref(null)
  onClickOutside(targetRef, (e) => {
    e.stopPropagation()
    toggleOpen()
  })
  return {
    open,
    toggleOpen,
    targetRef,
  }
}
