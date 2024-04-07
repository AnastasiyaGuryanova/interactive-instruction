import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [isLastStep, setIsLastStep] = useState(false);

	const clickForward = () => {
		setIsFirstStep(false);
		setActiveIndex(activeIndex + 1);
		if (activeIndex === steps.length - 2) setIsLastStep(true);
	};

	const clickBack = () => {
		setActiveIndex(activeIndex - 1);
		setIsLastStep(false);
		if (activeIndex === 1) setIsFirstStep(true);
	};

	const startOver = () => {
		setActiveIndex(0);
		setIsLastStep(false);
		setIsFirstStep(true);
	};

	const selectsStep = (event) => {
		const buttonIndex = event.target.textContent - 1;
		setActiveIndex(buttonIndex);
		setIsFirstStep(false);

		if (buttonIndex === steps.length - 1) {
			setIsLastStep(true);
		} else if (buttonIndex === 0) {
			setIsFirstStep(true);
			setIsLastStep(false);
		} else {
			setIsLastStep(false);			
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles["steps-list"]}>
						{steps.map((obj, index) => (
							<li
								className={
									styles["steps-item"] +
									" " +
									(index === activeIndex && styles.active) +
									" " +
									(index <= activeIndex && styles.done)
								}
								key={obj.id}
							>
								<button
									className={styles["steps-item-button"]}
									onClick={selectsStep}
								>
									{Number(obj.id)}
								</button>
								Шаг {Number(obj.id)}
							</li>
						))}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							disabled={isFirstStep}
							onClick={clickBack}
						>
							Назад
						</button>
						{!isLastStep ? (
							<button
								className={styles.button}
								onClick={clickForward}
							>
								Далее
							</button>
						) : (
							<button
								className={styles.button}
								onClick={startOver}
							>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
