import { ref, computed, type Ref } from "vue";

const STAGE = {
  SHOW_START: "START",
  SHOW_GAME: "GAME",
  SHOW_RESULTS: "RESULTS",
  SHOW_MENU: "MENU",
} as const;

type AppStage = (typeof STAGE)[keyof typeof STAGE];

const currentAppStage: Ref<AppStage> = ref(STAGE.SHOW_GAME);

function showStartScreen() {
  currentAppStage.value = STAGE.SHOW_START;
}
function showMenu() {
  currentAppStage.value = STAGE.SHOW_MENU;
}
function hideMenu() {
  currentAppStage.value = STAGE.SHOW_GAME;
}
function showResults() {
  currentAppStage.value = STAGE.SHOW_RESULTS;
}
function showGameScreen() {
  currentAppStage.value = STAGE.SHOW_GAME;
}
const shouldShowStartScreen = computed(
  () => currentAppStage.value === STAGE.SHOW_START
);
const shouldShowGameScreen = computed(
  () =>
    currentAppStage.value === STAGE.SHOW_GAME ||
    currentAppStage.value === STAGE.SHOW_MENU
);
const shouldShowMenu = computed(
  () => currentAppStage.value === STAGE.SHOW_MENU
);
export default function useState() {
  return {
    state: {
      shouldShowGameScreen,
      shouldShowMenu,
      shouldShowStartScreen,
    },
    methods: {
      showGameScreen,
      showStartScreen,
      showMenu,
      hideMenu,
      showResults,
    },
  };
}
