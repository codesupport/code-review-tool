import { useEffect, useState, type ChangeEventHandler } from "react";

export interface IDropdownOption {
	id: string | number;
	text: string | number;
	value: string | number;
	default?: boolean;
	disabled?: boolean;
}

interface IProps {
	options: IDropdownOption[];
	handleOnChange: ChangeEventHandler<HTMLSelectElement>;
}

export function Dropdown({ options, handleOnChange }: IProps) {
	const [modifiedOptions, setModifiedOptions] = useState<IDropdownOption[]>(options);

	useEffect(() => {
		const hasDefault = !!options.find(option => option.default);

		if (!hasDefault) {
			setModifiedOptions([{
				id: "__",
				text: "Select One",
				value: "Select One",
				default: true,
				disabled: true
			}, ...options]);
		} else {
			setModifiedOptions(options);
		}
	}, [options]);

	return (
		<select onChange={handleOnChange}>
			{modifiedOptions.map(option => (
				<option
					selected={option.default}
					key={option.id}
					value={option.value}
					disabled={option.disabled}
				>
					{option.text}
				</option>
			))}
		</select>
	)
}
