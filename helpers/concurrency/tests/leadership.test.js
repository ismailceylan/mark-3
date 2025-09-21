import { describe, it, expect, vi, beforeEach } from "vitest";
import { leadership } from "..";

describe("leadership helper", () =>
{
	let mockRequest;

	beforeEach(() => {
		vi.resetModules();

		mockRequest = vi.fn();

		Object.defineProperty(global, "navigator", {
			value: {
				locks: {
					request: mockRequest,
				},
			},
			configurable: true,
		});
	});

	it("should return true when lock is acquired", async () =>
	{
		mockRequest.mockImplementation((_name, _options, callback) =>
		{
			return callback({ name: "test-lock" });
		});

		const result = await leadership("test-lock");
		expect(result).toBe(true);
		expect(mockRequest).toHaveBeenCalledTimes(1);
	});

	it("should try again when lock is not available", async () =>
	{
		mockRequest.mockImplementation((_name, _options, callback) =>
		{
			return callback(null);
		});

		const first = await leadership("missing-lock");
		const second = await leadership("missing-lock");

		expect(first).toBe(false);
		expect(second).toBe(false);
		// because false is NOT cached, request runs again
		expect(mockRequest).toHaveBeenCalledTimes(2);
	});

	it("should cache the result when lock is acquired", async () =>
	{
		mockRequest.mockImplementation((_name, _options, callback) =>
		{
			return callback({ name: "cached-lock" });
		});

		const first = await leadership("cached-lock");
		const second = await leadership("cached-lock");

		expect(first).toBe(true);
		expect(second).toBe(true);
		expect(mockRequest).toHaveBeenCalledTimes(1); // called only once because of cache
	});

	it("should update cache when lock is not available", async () =>
	{
		mockRequest.mockImplementation((_name, _options, callback) =>
		{
			return callback(null);
		});

		const first = await leadership("missing-lock");
		const second = await leadership("missing-lock");

		expect(first).toBe(false);
		expect(second).toBe(false);
		expect(mockRequest).toHaveBeenCalledTimes(2); // still tries twice because cache stores false
	});
});
