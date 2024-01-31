import { describe, test, expect, beforeEach } from "vitest";
import GameSummaryVue from "../GameSummary.vue";
import { mount } from "@vue/test-utils";

describe("GameSummary.vue", () => {
  const defaultSPProps = {
    moves: 8,
    time: 104,
    scores: [8],
  };
  let wrapper = mount(GameSummaryVue, { props: defaultSPProps });
  describe("Single player game", () => {
    beforeEach(() => {
      wrapper.setProps(defaultSPProps);
    });
    test("renders single player game summary heading", () => {
      expect(wrapper.get("h2").text()).toEqual("You did it!");
    });
    test("renders single player game summary caption", () => {
      expect(wrapper.get(".summary-caption").text()).toEqual(
        "Game over! Here's how you got on..."
      );
    });
    test("renders single player game moves", () => {
      const bars = wrapper.get("#summary-content").findAllComponents("*");

      expect(bars[1].get("#text-bar-caption").text()).toEqual("Moves Taken");
      expect(bars[1].get("#text-bar-result").text()).toEqual("8 Moves");
    });
    test("renders single player game time", async () => {
      const bars = wrapper.get("#summary-content").findAllComponents("*");

      expect(bars[0].get("#text-bar-caption").text()).toEqual("Time Elapsed");
      expect(bars[0].get("#text-bar-result").text()).toEqual("1:44");
      await wrapper.setProps({ moves: 8, scores: [8], time: 59 });
      expect(
        wrapper
          .get("#summary-content")
          .findAllComponents("*")[0]
          .get("#text-bar-result")
          .text()
      ).toEqual("0:59");
    });
  });
  describe("Multiplayer game", () => {
    async function testResults(scores: number[], winners: boolean[]) {
      await wrapper.setProps({ moves: 34, time: 216, scores });
      let results = wrapper.get("#summary-content").findAllComponents("*");
      expect(results.length).toEqual(scores.length);
      scores.forEach((score, index) => {
        if (winners[index]) {
          expect(results[index].get("#text-bar-caption").text()).toEqual(
            `Player ${index + 1}(Winner!)`
          );
        } else {
          expect(results[index].get("#text-bar-caption").text()).toEqual(
            `Player ${index + 1}`
          );
        }
        expect(results[index].get("#text-bar-result").text()).toEqual(
          `${score} Pairs`
        );
      });
    }

    test("renders correct multiplayer game summary heading, when there is one winner", async () => {
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 4, 2, 6] });
      expect(wrapper.get("h2").text()).toEqual("Player 4 Wins!");
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 4, 6, 2] });
      expect(wrapper.get("h2").text()).toEqual("Player 3 Wins!");
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 6, 4, 2] });
      expect(wrapper.get("h2").text()).toEqual("Player 2 Wins!");
      await wrapper.setProps({ moves: 34, time: 216, scores: [6, 4, 4, 2] });
      expect(wrapper.get("h2").text()).toEqual("Player 1 Wins!");
    });

    test("renders correct multiplayer game summary heading, when it's a tie ", async () => {
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 5, 2, 5] });
      expect(wrapper.get("h2").text()).toEqual("It's a tie!");
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 4, 4, 4] });
      expect(wrapper.get("h2").text()).toEqual("It's a tie!");
      await wrapper.setProps({ moves: 34, time: 216, scores: [8, 8] });
      expect(wrapper.get("h2").text()).toEqual("It's a tie!");
    });
    test("renders multiplayer game summary caption", async () => {
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 5, 2, 5] });
      expect(wrapper.get(".summary-caption").text()).toEqual(
        "Game over! Here are the results..."
      );
    });
    test("renders correct multiplayer game results when it's a tie", async () => {
      await testResults([8, 8], [true, true]);
      await testResults([4, 4, 4, 4], [true, true, true, true]);
      await testResults([3, 3, 5, 5], [false, false, true, true]);
    });
    test("sets correct styling for winner's/winners scores", async () => {
      await wrapper.setProps({ moves: 34, time: 216, scores: [4, 5, 2, 5] });

      const bars = wrapper.get("#summary-content").findAllComponents("*");
      expect(bars[0].props().isHighlighted).toEqual(false);
      expect(bars[1].props().isHighlighted).toEqual(true);
      expect(bars[2].props().isHighlighted).toEqual(false);
      expect(bars[3].props().isHighlighted).toEqual(true);
    });
    test("emits restart-request event on click", async () => {
      await wrapper.get("#summary-button-restart").trigger("click");
      expect(wrapper.emitted()).toHaveProperty("restart-request");
    });
    test("emits new-game-request event on click", async () => {
      await wrapper.get("#summary-button-new-game").trigger("click");
      expect(wrapper.emitted()).toHaveProperty("new-game-request");
    });
  });
});
