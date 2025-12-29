import { ref, watch, onMounted, type Ref } from "vue";

/**
 * A composition function that makes an element a separated OTP input and provides
 * reactive properties related to the input.
 *
 * @param [options.totalDigits=5] - The total number of digits in the OTP.
 * @param [options.autoFocus=false] - Whether to autofocus the first input.
 * @param [options.onComplete] - A callback function to be called when the OTP is complete.
 * @param [options.onPasteInvalidOTP] - A callback function to be called when
 * the user pastes an invalid OTP.
 * @returns An object containing reactive properties related to the input.
 */
export default function useSeparatedOTPInputs(
{
	totalDigits = 5,
	autoFocus = false,
	onComplete, onPasteInvalidOTP
}: UseSeparatedOTPInputsOptions = {}): UseSeparatedOTPInputsReturnValue
{
	const inputs = [];
	const value = ref<number[]>([]);
	let hasPhysicalKeyboard = null;

	const input = {
		type: "text",
		name: "otp-digit",
		inputmode: "numeric",
		autocomplete: "off",
		spellcheck: "false",
		autocapitalize: "off",
		autocorrect: "off",
		placeholder: "•",
		maxlength: "1"
	}

	// focus first input
	if( autoFocus )
	{
		onMounted( focus );
	}

	if( onComplete )
	{
		watch( value, () =>
		{
			const otp = value.value.join( "" );
	
			if( otp.length == totalDigits )
			{
				onComplete( otp );
			}
		}, { deep: true });
	}

	function onKeyDown( e: KeyboardEvent )
	{
		if( e.code === "" )
		{
			return;
		}
		
		hasPhysicalKeyboard = true;

		const target = e.target as HTMLOTPInputElement;
		const index = target.otpPosition;

		if( e.key == "ArrowRight" || e.key == "ArrowDown" )
		{
			jumpNext( index );
		}
		else if( e.key == "ArrowLeft" || e.key == "ArrowUp" )
		{
			jumpPrevious( index );
		}
		else if( e.key == "Backspace" )
		{
			delete value.value[ index ];
			setTimeout(() => jumpPrevious( index ), 10 );
		}
		else if( e.key == "Tab" )
		{
			setTimeout(() => jumpNext( index ), 10 );
			e.preventDefault();
		}
		else if( e.key == "Delete" )
		{
			delete value.value[ index ];
			target.value = "";
		}
		else if([ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ].includes( e.key ))
		{
			target.value = e.key;
			value.value[ index ] = parseInt( e.key );

			setTimeout(() => jumpNext( index ), 10 );
		}
		else if( e.key == "v" && e.ctrlKey )
		{
			// doing nothing will allow default action (paste)
		}
		else
		{
			e.preventDefault();
		}
	}

	function onInput( e: InputEvent )
	{
		if( hasPhysicalKeyboard )
		{
			return;
		}

		const target = e.target as HTMLOTPInputElement;
		const index = target.otpPosition;

		if( e.inputType == "insertText" )
		{
			if([ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ].includes( e.data ))
			{
				value.value[ index ] = parseInt( target.value );
				jumpNext( index );
			}
			else
			{
				target.value = "";
			}
		}
		if( e.inputType == "deleteContentBackward" || e.inputType == "deleteContentForward" )
		{
			delete value.value[ index ];
			jumpPrevious( index );
		}
	}

	function onPasteOrDrop( e: ClipboardEvent|DragEvent )
	{
		const container = e instanceof DragEvent? e.dataTransfer : e.clipboardData;
		const clipboardText = container.getData( "Text" );
		const otpPattern = new RegExp( `(?<![0-9])[0-9]{${ totalDigits }}(?![0-9])` )
		const otp = clipboardText.match( otpPattern );

		if( otp === null )
		{
			e.preventDefault();
			onPasteInvalidOTP?.( clipboardText );

			return;
		}

		for( let i = 0; i < totalDigits; i++ )
		{
			inputs[ i ].value = otp[ 0 ][ i ];
			value.value[ i ] = parseInt( otp[ 0 ][ i ]);
		}
	}

	function reset()
	{
		value.value = [];

		for( const input of inputs )
		{
			input.value = "";
		}
	}

	function jumpNext( index: number )
	{
		if( index >= totalDigits - 1 )
		{
			return;
		}

		const target = inputs[ index + 1 ];

		if( target && target !== document.activeElement )
		{
			target.focus();
			setTimeout(() => target.select(), 10);
		}
	}

	function jumpPrevious( index: number )
	{
		if( index <= 0 )
		{
			return;
		}

		const target = inputs[ index - 1 ];

		if( target && target !== document.activeElement )
		{
			target.focus();
			setTimeout(() => target.select(), 10);
		}
	}

	function capture( el: HTMLOTPInputElement )
	{
		if( el && ! inputs.includes( el ))
		{
			el.otpPosition = inputs.push( el ) - 1;
		}
	}

	function focus()
	{
		inputs[ 0 ].focus();
	}

	return {
		capture,
		reset,
		focus,
		value,
		input,
		listeners: { keydown: onKeyDown, input: onInput, paste: onPasteOrDrop, drop: onPasteOrDrop },
	};
}

interface UseSeparatedOTPInputsOptions
{
	/** The number of digits in the OTP */
	totalDigits?: number;
	/** Whether to automatically focus the first input */
	autoFocus?: boolean;
	/** The function to be called when the OTP is complete */
	onComplete?: ( otp: string ) => void;
	/** The function to be called when the pasted OTP is invalid */
	onPasteInvalidOTP?: ( clipboardText: string ) => void;
}

interface UseSeparatedOTPInputsReturnValue
{
	/** The function to be called when a key is pressed */
	// onKeyDown: ( e: KeyboardEvent, index: number ) => void;
	/** The function to be called when a key is input */
	// onInput: ( e: Event, index: number ) => void;
	/** The function to be called when a key is pasted */
	// onPaste: ( e: ClipboardEvent, index: number ) => void;
	/** The function should be passed the input element's ref attribute */
	capture: ( el: HTMLInputElement ) => void;
	/** The reactive value of the OTP */
	value: Ref<number[]>;
	/** The function to reset all of the OTP digits at once */
	reset: () => void;
	/** The function to focus the first input */
	focus: () => void;
	/** The input element's predefined event listeners */
	listeners: object,
	/** The input element's predefined attributes */
	input: object
}

interface HTMLOTPInputElement extends HTMLInputElement
{
	/** The position of the input element in the array of inputs */
	otpPosition?: number;
}

