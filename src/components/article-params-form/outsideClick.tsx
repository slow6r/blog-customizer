import { useEffect } from 'react';

type UseOutsideClick = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClick = ({
	isOpen,
	onClose,
	rootRef,
}: UseOutsideClick) => {
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isOpen && onClose?.();
			}
		};

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
			}
		};

		window.addEventListener('keydown', handleEsc);
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleEsc);
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose]);
};
