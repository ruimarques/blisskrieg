import { QuestionsResponse } from '../Questions';
import styles from './Question.module.css';

const Question = (props: {
  question: QuestionsResponse;
  selected: (q: QuestionsResponse) => void;
}) => {
  return (
    <li className={styles.item} onClick={() => props.selected(props.question)}>
      <img src={props.question.thumb_url} alt={props.question.question}></img>
      <div>
        <h3>{`${props.question.id} - ${props.question.question}`}</h3>
        <ul className={styles.choices}>
          {props.question.choices.map((a, i) => (
            <li key={i}>{`${a.choice} (${a.votes} Votes)`}</li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Question;
