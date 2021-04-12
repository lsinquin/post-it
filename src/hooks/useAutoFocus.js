import { isMobile } from "react-device-detect";

function useAutoFocus() {
  // No autofocus on Mobile, Tablet since the keyboard takes too much space
  const autoFocus = !isMobile;

  return {
    autoFocus,
  };
}

export default useAutoFocus;
