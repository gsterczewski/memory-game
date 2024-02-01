import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameStatusBarVue from "../GameStatusBar.vue";
describe("GameStatusBar.vue", () => {
  describe("single player", () => {
    const singlePlayerProps = {
      scores: [8],
      time: "2:05",
      moves: 8,
      activePlayerIndex: 0,
    };
    const wrapper = mount(GameStatusBarVue, { props: singlePlayerProps });
    test("renders single player version", () => {
      expect(wrapper.get("[data-test=sp-status]")).toBeDefined();
    });
    test("in single player version renders current time", () => {
      expect(wrapper.get("[data-test=sp-status-time]").text()).toEqual("2:05");
    });
    test("in single player version renders current moves", () => {
      expect(wrapper.get("[data-test=sp-status-moves]").text()).toEqual("8");
    });
  });
  describe("2-4 players", () => {
    const multiPlayerProps = {
      scores: [4, 6, 2, 4],
      time: "0",
      moves: 32,
      activePlayerIndex: 2,
    };
    const wrapper = mount(GameStatusBarVue, { props: multiPlayerProps });
    test("renders multi player version", () => {
      expect(wrapper.get("[data-test=mp-status]")).toBeDefined();
    });
    test("in multi player version renders labels for each player", () => {
      const labels = wrapper.findAll("[data-test=mp-status-player]");
      const scores = wrapper.findAll("[data-test=mp-status-score]");
      expect(labels.length).toEqual(4);
      expect(scores.length).toEqual(4);
      expect(labels[0].text()).toEqual("Player 1");
      expect(labels[1].text()).toEqual("Player 2");
      expect(labels[2].text()).toEqual("Player 3");
      expect(labels[3].text()).toEqual("Player 4");
    });
    test("in multi player version renders scores for each player", () => {
      const scores = wrapper.findAll("[data-test=mp-status-score]");
      expect(scores.length).toEqual(4);
      expect(scores[0].text()).toEqual("4");
      expect(scores[1].text()).toEqual("6");
      expect(scores[2].text()).toEqual("2");
      expect(scores[3].text()).toEqual("4");
    });
    test("in multi player version indicate current player's move", () => {
      const statuses = wrapper.findAll("[data-test=mp-status]");
      expect(statuses[2].classes()).contain("status--selected");
      expect(statuses[0].classes()).not.contain("status--selected");
      expect(statuses[1].classes()).not.contain("status--selected");
      expect(statuses[3].classes()).not.contain("status--selected");
    });
  });
});
