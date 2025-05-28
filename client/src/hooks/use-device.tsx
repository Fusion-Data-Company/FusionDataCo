import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useDevice() {
  const [device, setDevice] = React.useState<{
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    width: number
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 1920
  })

  React.useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth
      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT
      const isDesktop = width >= TABLET_BREAKPOINT

      setDevice({
        isMobile,
        isTablet,
        isDesktop,
        width
      })
    }

    // Initial check
    updateDevice()

    // Listen for resize events
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  return device
}

export function useIsMobile() {
  const { isMobile } = useDevice()
  return isMobile
}

export function useIsTablet() {
  const { isTablet } = useDevice()
  return isTablet
}

export function useIsDesktop() {
  const { isDesktop } = useDevice()
  return isDesktop
}