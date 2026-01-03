import { describe, it, expect } from "vitest";
import { split } from "..";

describe( "split", () =>
{
	it("marker varsa direkt oradan böler", () =>
	{
 	   const text = `
Birinci paragraf.

<!-- more -->

İkinci paragraf.
Üçüncü paragraf.
    `.trim();

		const result = split(text, { marker: "<!-- more -->" });

		expect(result.preview).toBe("Birinci paragraf.");
		expect(result.rest).toContain("İkinci paragraf");
		expect(result.reason).toBe("marker");
		expect(result.isCollapsed).toBe(true);
	});

  it("paragraf sayısı limiti aşılmıyorsa collapse etmez", () =>
	{
    	const text = `
Paragraf 1.

Paragraf 2.
    `.trim();

		const result = split(text, { maxParagraphs: 3 });

		expect(result.preview).toBe(text);
		expect(result.rest).toBe("");
		expect(result.reason).toBe("none");
		expect(result.isCollapsed).toBe(false);
	});
	
	it("maxParagraphs guard'ı ile böler", () =>
	{
    	const text = `
Paragraf 1.

Paragraf 2.

Paragraf 3.

Paragraf 4.
    `.trim();

		const result = split(text, {
			maxParagraphs: 2,
			maxWords: 1000,
		});

		expect(result.preview).toBe("Paragraf 1.\n\nParagraf 2.");
		expect(result.rest).toBe("Paragraf 3.\n\nParagraf 4.");
		expect(result.reason).toBe("maxParagraphs");
		expect(result.isCollapsed).toBe(true);
	});

	it("word split paragraf yapısını korur", () =>
	{
		const text = `
Birinci paragraf burada biraz uzun yazılmıştır.

İkinci paragraf da aynı şekilde biraz uzun tutulmuştur.

Üçüncü paragraf en sona kalır.
    `.trim();

		const result = split(text, {
			maxParagraphs: 10,
			maxWords: 10,
		});

		expect(result.reason).toBe("maxWords");
		expect(result.isCollapsed).toBe(true);

		// Preview birden fazla paragraf içerebilir
		expect(result.preview).toContain("\n\n");

		// Rest de paragraf yapısını korumalı
		expect(result.rest).toContain("\n\n");
	});

	it("paragraf ve word split yakın uzunluktaysa paragraf tercih edilir", () =>
	{
    	const text = `
Birinci paragraf kelimeler kelimeler kelimeler.

İkinci paragraf kelimeler kelimeler.

Üçüncü paragraf kelimeler.
    `.trim();

		const result = split(text, {
			maxParagraphs: 2,
			maxWords: 9,
			paragraphTolerancePercent: 20,
		});

		expect(result.reason).toBe("maxParagraphs");
		expect(result.preview).toBe(
		"Birinci paragraf kelimeler kelimeler kelimeler.\n\nİkinci paragraf kelimeler kelimeler."
		);
	});

	it("text boşsa collapse etmez", () =>
	{
		const result = split("", {
			maxParagraphs: 2,
			maxWords: 10,
		});

		expect(result.preview).toBe("");
		expect(result.rest).toBe("");
		expect(result.reason).toBe("none");
		expect(result.isCollapsed).toBe(false);
	});

	it("maxWords aşılmıyorsa collapse etmez", () =>
	{
		const text = "Kısa bir text burada.";

		const result = split(text, {
			maxWords: 50,
		});

		expect(result.preview).toBe(text);
		expect(result.rest).toBe("");
		expect(result.reason).toBe("none");
		expect(result.isCollapsed).toBe(false);
	});

	it("word split paragraf ortasında bölünebilir ama yapı korunur", () =>
	{
		const text = `
Birinci paragraf kelime kelime kelime kelime kelime.

İkinci paragraf kelime kelime kelime.
    `.trim();

		const result = split(text, {
			maxWords: 6,
		});

		expect(result.reason).toBe("maxWords");
		expect(result.preview.split("\n\n").length).toBeGreaterThanOrEqual(1);
		expect(result.rest).toContain("kelime");
		expect(result.isCollapsed).toBe(true);
	});

});
