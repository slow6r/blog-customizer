import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import clsx from 'clsx';
import { Text } from 'components/text';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { useOutsideClick } from './outsideClick';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: typeof defaultArticleState;
	resetStyles: () => void;
	applyStyles: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	articleState,
	resetStyles,
	applyStyles,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(articleState);

	useEffect(() => {
		setFormState(articleState);
	}, [articleState]);

	const handlerFontFamilyOption = (value: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: value });
	};

	const handlerFontColor = (value: OptionType) => {
		setFormState({ ...formState, fontColor: value });
	};

	const handlerBackgroundColor = (value: OptionType) => {
		setFormState({ ...formState, backgroundColor: value });
	};

	const handlerContentWidth = (value: OptionType) => {
		setFormState({ ...formState, contentWidth: value });
	};

	const handlerFontSizeOption = (value: OptionType) => {
		setFormState({ ...formState, fontSizeOption: value });
	};

	const handleArrowButtonClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const formRef = useRef<HTMLDivElement | null>(null);

	useOutsideClick({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: handleArrowButtonClick,
	});

	const handleApplyState = (event: FormEvent) => {
		event.preventDefault();
		applyStyles({
			fontFamilyOption: formState.fontFamilyOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSizeOption,
		});
	};

	return (
		<main>
			<div ref={formRef}>
				<ArrowButton onClick={handleArrowButtonClick} isOpen={isMenuOpen} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form className={styles.form} onSubmit={handleApplyState}>
						<Text as={'h2'} size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							onChange={handlerFontFamilyOption}
							options={fontFamilyOptions}
							placeholder='Выберите шрифт'
							title='шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='размер шрифта'
							onChange={handlerFontSizeOption}
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							placeholder='Выберите цвет'
							title='цвет шрифта'
							onChange={handlerFontColor}
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							placeholder='Выберите цвет'
							title='цвет фона'
							onChange={handlerBackgroundColor}
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							placeholder='Выберите ширину'
							title='ширина контента'
							onChange={handlerContentWidth}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={resetStyles} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</main>
	);
};
