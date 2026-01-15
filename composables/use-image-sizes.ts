import { ref } from "vue";

/**
 * Returns the natural width and height of an image, along with a
 * onLoad function that can be used to load the image.
 * 
 * @returns width, height and onLoad function
 */
export default function useImageSizes()
{
	const width = ref( 16 );
	const height = ref( 9 );

	function onLoad( event: Event )
	{
		const img = event.target as HTMLImageElement;

		width.value = img.naturalWidth;
		height.value = img.naturalHeight;
	}

	return { width, height, onLoad }
}
