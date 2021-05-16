import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_ENDPOINT, PAGING_LIMIT } from './global-constants';
import SearchComponent from './components/Search';
import QuestionComponent from './components/Question';
import PaginationComponent from './components/Pagination';
import HeaderComponent from './components/Header';
import styles from './QuestionsPage.module.css';
import { getBaseUrl, useQuery } from './utils';
import LoadingComponent from './components/Loading';

export interface QuestionsResponse {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: {
    choice: string;
    votes: number;
  }[];
}

const QuestionsPage = () => {
  const query = useQuery();
  const history = useHistory();
  const filter = query.get('filter');

  const [questions, setQuestions] = useState<QuestionsResponse[]>([]);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const shareUrl = `/share?url=${getBaseUrl()}/questions?filter=${searchInput}`;

  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_ENDPOINT}/questions?limit=${PAGING_LIMIT}&offset=${offset}${
        filter ? `&filter=${filter}` : ''
      }`
    )
      .then((data) => data.json())
      .then((data: QuestionsResponse[]) => {
        setQuestions(data);
        setLoading(false);
      });
  }, [offset, filter]);

  const onPrevious = () => {
    setOffset(offset - PAGING_LIMIT > 0 ? offset - PAGING_LIMIT : 0);
  };

  const onNext = () => {
    setOffset(offset + PAGING_LIMIT);
  };

  const onSelectedQuestion = (question: QuestionsResponse) => {
    const detailsPath = `/questions/${question.id}`;
    history.push(detailsPath);
  };

  return (
    <>
      <HeaderComponent title="Questions List" />
      <section className={styles.content}>
        <div className={styles.search}>
          <SearchComponent<QuestionsResponse[]>
            query={filter}
            onSearch={(result) => setQuestions(result)}
            onSearchInput={(input) => {
              setOffset(0);
              setSearchInput(input);
            }}
            onCancel={() => setSearchInput(null)}
          />
          {searchInput && (
            <a href={shareUrl}>{'Share search result: ' + searchInput}</a>
          )}
        </div>

        {!loading && !questions.length && <p>Your questions are empty.</p>}
        <h2 className={styles.listTitle}>
          {filter != null ? 'Search results' : 'List of all questions'}
        </h2>

        {loading && !questions.length ? (
          <LoadingComponent />
        ) : (
          <ul>
            {questions.map((listitem) => (
              <li key={listitem.id}>
                <QuestionComponent
                  question={listitem}
                  selected={onSelectedQuestion}
                />
              </li>
            ))}
          </ul>
        )}

        {questions.length && (
          <PaginationComponent
            offset={offset}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        )}
      </section>
    </>
  );
};

export default QuestionsPage;
