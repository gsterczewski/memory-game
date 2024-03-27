<script setup lang="ts">
import useGame from "./composables/useGame";
import PopupMenu from "./components/PopupMenu.vue";
import GameHeader from "./components/GameHeader.vue";
import GameBoard from "./components/GameBoard.vue";
import GameStatusBar from "./components/GameStatusBar.vue";
import GameSummary from "./components/GameSummary.vue";
import StartBox from "./components/StartBox.vue";
import BaseButton from "./components/BaseButton.vue";
import AppLogo from "./components/AppLogo.vue";
import useState from "./composables/useState";
import AppOverlay from "./components/AppOverlay.vue";
import formatTime from "./lib/formatTime";
import { watch, computed } from "vue";
const { gameControls, optionsState, game } = useGame();
const { currentOptions } = optionsState;
const { state, setGameStage } = useState();
const { createNewGame, restartGame: restart } = gameControls;
const {
  shouldShowStartScreen,
  shouldShowGameScreen,
  shouldShowMenu,
  shouldShowResults,
} = state;

function startNewGame() {
  createNewGame();
  setGameStage("GAME");
}
function restartGame() {
  restart();
  setGameStage("GAME");
}
function showMenu() {
  setGameStage("MENU");
}
function hideMenu() {
  setGameStage("GAME");
}
function showStartScreen() {
  setGameStage("START");
}
const isOver = computed(() => game.value.isOver());
watch(isOver, (isOver) => {
  const newStage = isOver ? "RESULTS" : "GAME";
  setGameStage(newStage);
});
</script>
<template>
  <div class="wrapper">
    <AppOverlay v-if="shouldShowMenu">
      <PopupMenu
        :handle-new-game="showStartScreen"
        :handle-resume="hideMenu"
        :handle-restart="restartGame"
      />
    </AppOverlay>
    <div class="game-screen" v-if="shouldShowGameScreen">
      <div class="header-container">
        <GameHeader>
          <template #menu-button>
            <BaseButton theme="primary" @click="showMenu">Menu</BaseButton>
          </template>
          <template #control-buttons>
            <BaseButton theme="primary" @click="restartGame"
              >Restart</BaseButton
            >
            <BaseButton @click="showStartScreen">New Game</BaseButton>
          </template>
        </GameHeader>
      </div>
      <main class="board-container">
        <GameBoard
          :board="game.getBoard()"
          :theme="currentOptions.theme"
          :handle-flip-tile="game.selectTile.bind(game)"
        />
      </main>
      <div
        class="status-bar-container"
        :class="{ 'status-bar-container--short': currentOptions.players === 1 }"
      >
        <GameStatusBar
          :moves="game.getMoves()"
          :time="formatTime(game.getTime())"
          :scores="game.getScores()"
          :active-player-index="game.getActivePlayerIndex()"
        />
      </div>
    </div>
    <AppOverlay v-if="shouldShowResults">
      <GameSummary
        @new-game-request="showStartScreen"
        @restart-request="restartGame"
        :scores="game.getScores()"
        :time="game.getTime()"
        :moves="game.getMoves()"
        title="You did it!"
        caption="Game over, here are the results.."
      />
    </AppOverlay>
    <div class="start-screen" v-if="shouldShowStartScreen">
      <AppLogo />
      <StartBox :handle-start-game="startNewGame" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.start-screen {
  --padding-top: 10vh;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--padding-top) / 2);
  align-items: center;
  padding-top: var(--padding-top);
  color: var(--color-neutral-200);
  background-color: var(--color-neutral-800);
}

.game-screen {
  width: 100%;
  height: 100%;
  max-width: 1100px;
  padding-inline: 1.5rem;
  padding-block: 1.5rem;
  display: grid;
  grid-template-rows: auto minmax(4rem, 1fr) auto minmax(4rem, 1fr) auto;
  justify-items: center;
}

.header-container {
  grid-row: 1;
  width: 100%;
}
.board-container {
  grid-row: 3;
}
.status-bar-container {
  width: 100%;
  height: 4.5rem;
  grid-row: 5;
}

.status-bar-container--short {
  max-width: 540px;
}
@media (min-width: 48em) {
  .game-screen {
    padding-inline: 2.5rem;
    padding-block: clamp(24px, 8.8vh, 4.25rem);
    grid-template-rows: auto 6.5625rem auto 6.5625rem auto;
  }
}
</style>
