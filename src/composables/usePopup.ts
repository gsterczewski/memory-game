import { ref } from "vue";

export default function usePopup() {
  const isActive = ref(false);

  const showPopupMenu = () => {
    isActive.value = true;
  };
  const hidePopupMenu = () => {
    isActive.value = false;
  };
  return {
    isActive,
    show: showPopupMenu,
    hide: hidePopupMenu,
  };
}
