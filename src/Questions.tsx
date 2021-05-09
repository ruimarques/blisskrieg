import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { API_ENDPOINT, PAGING_LIMIT } from './global-constants';
import SearchComponent from './components/Search';
import Question from './components/Question';
import Pagination from './components/Pagination';

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

const handleCancel = () => {};

// const setQuestions = () => {};

const input = '';

// ROUTE: /questions?filter=FILTER
// If the filter parameter is missing, the user should simply be placed at the listing.
// If the filter parameter is present but has an empty value the user should be placed at
//  the filter variant with no input inserted but with the input box focused.

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QuestionsComponent = () => {
  const query = useQuery();

  const filter = query.get('filter');

  const history = useHistory();
  const [questions, setQuestions] = useState<QuestionsResponse[]>([]);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log('useEffect ', offset);
    fetch(
      `${API_ENDPOINT}/questions?limit=${PAGING_LIMIT}&offset=${offset}${
        input ? `&filter=${input}` : ''
      }`
    )
      .then((data) => data.json())
      .then((data: QuestionsResponse[]) => {
        // console.log(data);
        setQuestions(data);
      });
  }, [offset]);

  const shareUrl = `/questions?limit=${PAGING_LIMIT}&offset=${offset}&filter=${input}`;

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

      {!questions.length && <p>Your questions are empty.</p>}
      <h2>List of questions</h2>
      <ul>
        {questions.map((listitem) => (
          <Question
            question={listitem}
            selected={onSelectedQuestion}
            key={listitem.id}
          />
        ))}
      </ul>
      <Pagination offset={offset} onPrevious={onPrevious} onNext={onNext} />
    </>
  );
};

export default QuestionsComponent;
