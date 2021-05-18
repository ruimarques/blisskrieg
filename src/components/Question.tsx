import { QuestionsResponse } from '../QuestionsPage';
import styles from './Question.module.css';

const QuestionComponent = (props: {
  question: QuestionsResponse;
  selected?: (q: QuestionsResponse) => void;
  voted?: (q: number) => void;
}) => {
  const questionText = `${props.question.id} - ${props.question.question}`;
  const questionClasses = [styles.item];

  if (!props.voted) {
    questionClasses.push(styles.selectable);
  }

  return (
    <div
      className={questionClasses.join(' ')}
      onClick={() => props.selected && props.selected(props.question)}
    >
      <div className={styles.imgContainer}>
        <img src={props.question.thumb_url} alt={props.question.question}></img>
      </div>
      <div className={styles.itemContent}>
        <h3 className={styles.question}>{questionText}</h3>
        <ul className={styles.choices}>
          {props.question.choices.map((a, i) => (
            <li key={i}>
              <span
                className={styles.choiceText}
              >{`${a.choice} (${a.votes} Votes)`}</span>

              {props.voted && (
                <button
                  className="button is-small"
                  onClick={() => props.voted && props.voted(i)}
                >
                  Vote!
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionComponent;
