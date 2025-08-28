import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { throttle } from "../";

describe( "throttle", () =>
{
	beforeEach(() =>
	{
		vi.useFakeTimers();
	});

	afterEach(() =>
	{
		vi.useRealTimers();
	});

	it("calls function immediately when leading=true", () =>
	{
		const fn = vi.fn();
		const throttled = throttle(fn, 100, { leading: true, trailing: false });

		throttled();
		expect(fn).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(50);
		throttled();
		expect(fn).toHaveBeenCalledTimes(1); // throttle engelledi
	});

	it("does not call immediately when leading=false", () =>
	{
		const fn = vi.fn();
		const throttled = throttle(fn, 100, { leading: false, trailing: true });

		throttled();
		expect(fn).toHaveBeenCalledTimes(0);

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1); // trailing çağrısı geldi
	});

	it("ensures trailing call runs with latest args", () =>
	{
		const fn = vi.fn();
		const throttled = throttle(fn, 100, { leading: true, trailing: true });

		throttled("a"); // hemen çalışır
		throttled("b"); // throttle engeller ama trailing için saklar
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledTimes(2);
		expect(fn).toHaveBeenLastCalledWith("b");
	});

	it("skips trailing if no further calls happen", () =>
	{
		const fn = vi.fn();
		const throttled = throttle(fn, 100, { leading: true, trailing: true });

		throttled("x"); // hemen çalışır
		vi.advanceTimersByTime(200);

		expect(fn).toHaveBeenCalledTimes(1); // trailing tetiklenmedi çünkü tekrar çağrı yok
	});

	it("works repeatedly over time windows", () =>
	{
		const fn = vi.fn();
		const throttled = throttle(fn, 100, { leading: true, trailing: true });

		throttled("first"); // hemen
		vi.advanceTimersByTime(100);

		throttled("second"); // hemen
		vi.advanceTimersByTime(100);

		throttled("third"); // hemen

		expect(fn).toHaveBeenCalledTimes(3);
		expect(fn).toHaveBeenLastCalledWith("third");
	});
});
