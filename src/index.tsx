import './styles/index.scss';
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const resetFormState = () => {
		setArticleState(defaultArticleState);
	};

	const applyState = (formState: typeof defaultArticleState) => {
		setArticleState(formState);
	};

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				resetStyles={resetFormState}
				applyStyles={applyState}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
