import { describe, it, expect, vi } from "vitest";
import debounce from ".";

describe("debounce", () =>
{
	it("should call the callback after the delay", async () =>
	{
		const callback = vi.fn();
		const delay = 100;
		const debouncedFn = debounce(callback, delay);

		debouncedFn();
		expect(callback).not.toHaveBeenCalled();

		// wait delay + 20ms
		await new Promise((r) => setTimeout(r, delay + 20));

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("should call the callback only once if called multiple times quickly", async () =>
	{
		const callback = vi.fn();
		const delay = 100;
		const debouncedFn = debounce(callback, delay);

		debouncedFn();
		debouncedFn();
		debouncedFn();

		expect(callback).not.toHaveBeenCalled();

		await new Promise((r) => setTimeout(r, delay + 20));

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("should pass arguments and context correctly", async () =>
	{
		const callback = vi.fn(function (a, b)
	{
			// 'this' should be the wrapper's this context
			expect(this).toEqual({ foo: "bar" });
			expect(a).toBe(1);
			expect(b).toBe(2);
		});

		const delay = 50;
		const debouncedFn = debounce(callback, delay);

		// call with context and arguments
		debouncedFn.call({ foo: "bar" }, 1, 2);

		await new Promise((r) => setTimeout(r, delay + 20));

		expect(callback).toHaveBeenCalledTimes(1);
	});
});
