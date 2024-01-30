import { ref, computed, type Ref } from "vue";

const STAGE = {
  SHOW_START: "START",
  SHOW_GAME: "GAME",
  SHOW_RESULTS: "RESULTS",
  SHOW_MENU: "MENU",
} as const;

export type AppStage = (typeof STAGE)[keyof typeof STAGE];

const currentAppStage: Ref<AppStage> = ref(STAGE.SHOW_GAME);

function setGameStage(stage: AppStage): void {
  currentAppStage.value = stage;
}
const shouldShowStartScreen = computed(
  () => currentAppStage.value === STAGE.SHOW_START
);
const shouldShowGameScreen = computed(
  () =>
    currentAppStage.value === STAGE.SHOW_GAME ||
    currentAppStage.value === STAGE.SHOW_MENU ||
    currentAppStage.value === STAGE.SHOW_RESULTS
);
const shouldShowMenu = computed(
  () => currentAppStage.value === STAGE.SHOW_MENU
);
const shouldShowResults = computed(
  () => currentAppStage.value === STAGE.SHOW_RESULTS
);
export default function useState() {
  return {
    state: {
      shouldShowGameScreen,
      shouldShowMenu,
      shouldShowStartScreen,
      shouldShowResults,
    },
    setGameStage,
  };
}
