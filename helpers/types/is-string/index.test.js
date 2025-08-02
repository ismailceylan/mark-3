import { describe, it, expect } from "vitest";
import isString from ".";

describe("isString", () => {
  it("should return true for a normal string", () => {
    expect(isString("hello")).toBe(true);
  });

  it("should return true for an empty string", () => {
    expect(isString("")).toBe(true);
  });

  it("should return false for a String object", () => {
    // typeof new String("abc") === "object"
    expect(isString(new String("abc"))).toBe(false);
  });

  it("should return false for a number", () => {
    expect(isString(123)).toBe(false);
  });

  it("should return false for null", () => {
    expect(isString(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isString(undefined)).toBe(false);
  });

  it("should return false for an object", () => {
    expect(isString({})).toBe(false);
  });

  it("should return false for an array", () => {
    expect(isString(["a", "b"])).toBe(false);
  });

  it("should return false for a boolean", () => {
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
  });

  it("should return false for a function", () => {
    expect(isString(() => {})).toBe(false);
  });
});
