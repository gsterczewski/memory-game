import { describe, test, expect, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import GameTileVue from "../GameTile.vue";
import { GameOptions } from "../../core/game";

const defaultProps = {
  isFlipped: false,
  isMatched: false,
  tileValue: 1,
  tileIndex: 0,
  theme: "numbers" as GameOptions["theme"],
};
let wrapper = shallowMount(GameTileVue, { props: defaultProps });
let component = wrapper.get("[data-test='tile']");
beforeEach(() => {
  wrapper = shallowMount(GameTileVue, { props: defaultProps });
  component = wrapper.get("[data-test='tile']");
});
describe("GameTile.vue", () => {
  describe("props", () => {
    test("renders without <span> child when isFlipped and isMatched props are set to false", () => {
      expect(component.element.children.length).toEqual(0);
    });
    test("renders <span> child with correct text node when isFlipped prop is set to true", async () => {
      await wrapper.setProps({ ...defaultProps, isFlipped: true });
      expect(component.get("span").text()).toEqual("1");
    });
    test("renders <span> child with correct text node when isMatched prop is set to true", async () => {
      await wrapper.setProps({ ...defaultProps, isMatched: true });

      expect(component.get("span").text()).toEqual("1");
    });
    test("renders without :disabled pseudo-class when isFlipped and isMatched props are set to false", () => {
      expect(component.attributes()["disabled"]).not.toBeDefined;
    });
    test("renders with :disabled pseudo-class when isFlipped prop is set to true", async () => {
      await wrapper.setProps({ ...defaultProps, isFlipped: true });
      expect(component.attributes()["disabled"]).toBeDefined;
    });
    test("renders with :disabled pseudo-class when isMatched prop is set to true", async () => {
      await wrapper.setProps({ ...defaultProps, isMatched: true });
      expect(component.attributes()["disabled"]).toBeDefined;
    });
    test("renders without tile--isFlipped class when isFlipped prop is set to false", () => {
      expect(component.classes()).not.contain("tile--isFlipped");
    });
    test("renders with tile--isFlipped class when isFlipped prop is set to true", async () => {
      await wrapper.setProps({ ...defaultProps, isFlipped: true });
      expect(component.classes()).contain("tile--isFlipped");
    });
    test("renders without tile--isMatched class when isMatched prop is set to false", () => {
      expect(component.classes()).not.contain("tile--isMatched");
    });
    test("renders with tile--isMatched class when isMatched prop is set to true", async () => {
      await wrapper.setProps({ ...defaultProps, isMatched: true });
      expect(component.classes()).contain("tile--isMatched");
    });
  });
  describe("events", () => {
    test("on click emits 'selectTile' event", () => {
      component.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("selectTile");
    });
    test("emmited'selectTile' event has correct value", async () => {
      await wrapper.setProps({ ...defaultProps, tileIndex: 8 });
      component.trigger("click");
      await wrapper.setProps({ ...defaultProps, tileIndex: 3 });
      component.trigger("click");
      expect(wrapper.emitted("selectTile")![0]).toEqual([8]);
      expect(wrapper.emitted("selectTile")![1]).toEqual([3]);
    });
  });
});
