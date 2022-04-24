export type Props = {
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
	buttonText?: string;
	disabled?: boolean;
};

export default function Button({ className, onClick, type = 'button', buttonText = 'button' }: Props) {
	return (
		<button className={`btn ${className}`} onClick={onClick} type={type}>
			{buttonText}
		</button>
	);
};
