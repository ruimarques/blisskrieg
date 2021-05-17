import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import appStyles from './App.module.css';
import styles from './DetailsPage.module.css';
import HeaderComponent from './components/Header';
import QuestionComponent from './components/Question';
import { API_ENDPOINT } from './global-constants';
import { QuestionsResponse } from './QuestionsPage';
import LoadingComponent from './components/Loading';
import { getBaseUrl } from './utils';

type DetailsParams = {
  id: string;
};

// Immutable update to a question's choice
const updateQuestionVote = (question: QuestionsResponse, choice: number) => {
  const selectedChoice = question?.choices[choice];
  const currentVotes = selectedChoice?.votes ?? 0;

  const updateChoices = Object.assign([], question?.choices, {
    [choice]: {
      choice: selectedChoice.choice,
      votes: currentVotes + 1,
    },
  });

  return {
    ...question,
    choices: [...updateChoices],
  };
};

const DetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<QuestionsResponse | null>(null);
  let { id } = useParams<DetailsParams>();

  const urlToShare = `${getBaseUrl()}/questions/${id}`;
  const sharePath = encodeURI(`/share?url=${urlToShare}`);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_ENDPOINT}/questions/${id}`)
      .then((data) => data.json())
      .then((data: QuestionsResponse) => {
        setLoading(false);
        setQuestion(data);
      });
  }, [id]);

  const onVote = (q: number) => {
    const updateQuestion = question ? updateQuestionVote(question, q) : null;

    // Optimistic UI update
    setQuestion(updateQuestion);

    fetch(`${API_ENDPOINT}/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateQuestion),
    });
  };

  return (
    <>
      <HeaderComponent title="Question Details" />
      <section className={appStyles.content}>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <div className={styles.questionContainer}>
              {question && (
                <QuestionComponent question={question} voted={onVote} />
              )}
            </div>
          </>
        )}

        <div className={styles.actions}>
          <a className={`button is-light `} href="/questions">
            Back to List
          </a>
          {question && (
            <a className={`button is-info`} href={sharePath}>
              Share
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
