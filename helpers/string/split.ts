/**
 * Splits a long multiline text into a preview and the remaining text for collapsible UI.
 * 
 * The splitting follows this priority:
 * 1. If a `marker` is provided and exists in the text, split at the marker.
 * 2. If the total word count exceeds `maxWords`, split while preserving paragraph boundaries.
 * 3. If the paragraph count exceeds `maxParagraphs`, split by paragraphs.
 * 4. If none of the above, return the full text as preview with no collapse.
 * 
 * Paragraph boundaries are preserved in both preview and rest sections.
 * 
 * @param text - The input text to split.
 * @param options - Optional configuration for the split behavior.
 * @param options.maxParagraphs - Maximum number of paragraphs allowed in the preview (default: 3).
 * @param options.maxWords - Maximum number of words allowed in the preview (default: 120).
 * @param options.marker - A string marker; if found, the split happens at this position (highest priority).
 * @param options.paragraphTolerancePercent - Percentage threshold to prefer paragraph split over word split if lengths are similar (default: 15%).
 * @returns An object containing:
 *  - `preview`: The text to show in the collapsed state.
 *  - `rest`: The remaining text to show when expanded.
 *  - `reason`: The guard that caused the split ('marker', 'maxParagraphs', 'maxWords', or 'none').
 *  - `isCollapsed`: Boolean flag indicating if the text is actually collapsed.
 * 
 * @example
 * const result = split(longText, { maxParagraphs: 2, maxWords: 100, marker: "<!-- more -->" });
 * console.log(result.preview); // Text before marker or split
 * console.log(result.rest);    // Remaining text
 * console.log(result.isCollapsed); // true or false
 */
export default function split( text: string, options: SplitOptions = {}): SplitResult
{
	const {
		maxParagraphs = 3,
		maxWords = 120,
		marker,
		paragraphTolerancePercent = 15,
	} = options;

	const normalized = text.trim();

	// Empty string check
	if( ! normalized )
	{
		return {
			preview: "",
			rest: "",
			reason: "none",
			isCollapsed: false,
		}
	}

	// Marker (highest priority)
	if( marker )
	{
		const index = normalized.indexOf( marker );

		if( index !== -1 )
		{
			const preview = normalized.slice( 0, index ).trim();
			const rest = normalized.slice( index + marker.length ).trim();

			return {
				preview,
				rest,
				reason: "marker",
				isCollapsed: Boolean( rest ),
			};
		}
	}

	// Paragraph parsing
	const paragraphs = normalized.split( /\n\s*\n/ );
	// Paragraph-based candidate
	const paragraphPreviewParts = paragraphs.slice( 0, maxParagraphs );
	const paragraphPreview = paragraphPreviewParts.join( "\n\n" );
	const paragraphWordCount = countWords( paragraphPreview );

	// Paragraph-aware word split
	const wordPreviewParts: string[] = [];
	const wordRestParts: string[] = [];

	let usedWords = 0;
	let reachedLimit = false;

	for( const paragraph of paragraphs )
	{
		if( reachedLimit )
		{
			wordRestParts.push( paragraph );
			continue;
		}

		const words = paragraph.split( /\s+/ );

		if( usedWords + words.length <= maxWords )
		{
			wordPreviewParts.push( paragraph );
			usedWords += words.length;
		}
		else
		{
			const remaining = maxWords - usedWords;

			if( remaining > 0 )
			{
				wordPreviewParts.push( words.slice( 0, remaining ).join( " " ));
				wordRestParts.push( words.slice( remaining ).join( " " ));
			}
			else
			{
				wordRestParts.push( paragraph );
			}

			reachedLimit = true;
		}
	}

	// If word limit is not reached, but paragraph limit is reached
	if( ! reachedLimit && paragraphs.length > maxParagraphs )
	{
		const rest = paragraphs.slice( maxParagraphs ).join( "\n\n" ).trim();

		return {
			preview: paragraphPreview.trim(),
			rest,
			reason: "maxParagraphs",
			isCollapsed: true,
		}
	}

	// If word split never triggered, no collapse needed
	if( ! reachedLimit )
	{
		return {
			preview: normalized,
			rest: "",
			reason: "none",
			isCollapsed: false,
		}
	}

	const wordPreview = wordPreviewParts.join( "\n\n" );
	const wordPreviewCount = countWords( wordPreview );

	// Decide best split
	const diffPercent =
		Math.abs( paragraphWordCount - wordPreviewCount ) /
		Math.max( paragraphWordCount, wordPreviewCount ) *
		100;

	const useParagraphSplit =
		paragraphWordCount <= maxWords ||
		diffPercent <= paragraphTolerancePercent;

	if( useParagraphSplit )
	{
		const rest = paragraphs.slice( maxParagraphs ).join( "\n\n" ).trim();

		return {
			preview: paragraphPreview.trim(),
			rest,
			reason: "maxParagraphs",
			isCollapsed: true,
		};
	}

	return {
		preview: wordPreview.trim(),
		rest: wordRestParts.join( "\n\n" ).trim(),
		reason: "maxWords",
		isCollapsed: true,
	}
}

function countWords( text: string ): number
{
	return text.trim().split( /\s+/ ).filter( Boolean ).length;
}

type SplitReason = "marker" | "maxParagraphs" | "maxWords" | "none";

type SplitOptions =
{
	/** Maximum allowed paragraph count. */
	maxParagraphs?: number;
	/** Maximum allowed word count. */
	maxWords?: number;
	/** Marker to split by. */
	marker?: string;
	/** Tolerance percent for paragraph split. */
	paragraphTolerancePercent?: number;
}

type SplitResult =
{
	/** Preview text. */
	preview: string;
	/** Remaining text. */
	rest: string;
	/** Split reason. */
	reason: SplitReason;
	/** Whether the result is collapsed. */
  	isCollapsed: boolean;
}
