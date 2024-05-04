import type { ChangeEventHandler } from "react";
import { Dropdown, IDropdownOption } from "../atoms/Dropdown";

interface IProps {
	title: string;
	description: string;
	options: IDropdownOption[];
	handleOnChange: ChangeEventHandler<HTMLSelectElement>;
}

export function DropdownWithTitle({ title, description, options, handleOnChange }: IProps) {
	return (
		<div>
			<h3>{title}</h3>
			<p>{description}</p>
			<Dropdown options={options} handleOnChange={handleOnChange} />
		</div>
	)
}
