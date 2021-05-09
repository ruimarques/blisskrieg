import classNames from 'classnames';
import { useState } from 'react';
import { API_ENDPOINT } from '../global-constants';

export interface SearchResult {
  id: number;
}

interface SearchProps<T> {
  query: string | null;
  onSearch: (a: T) => void;
  onSearchInput: (a: string) => void;
  onCancel: () => void;
}

// TODO:
const LIMIT = 10;
const offset = 0;

const SearchComponent = <T,>({
  query,
  onSearch,
  onSearchInput,
  onCancel,
}: SearchProps<T>) => {
  const [input, setInput] = useState(query || '');
  const [loading, setLoading] = useState(false);

  const handleSearch = (input: string) => {
    if (!input) {
      return;
    }
    console.log(input);

    setLoading(true);
    onSearchInput(input);

    fetch(
      `${API_ENDPOINT}/questions?limit=${LIMIT}&offset=${offset}&filter=${input}`
    )
      .then((data) => data.json())
      .then((data: T) => {
        onSearch(data);

        setLoading(false);
      });
  };

  const dismiss = () => {
    setInput('');
    onCancel();
  };

  return (
    <>
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Postal Code"
          autoFocus
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        ></input>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={() => handleSearch(input)}
            className={classNames({
              button: true,
              'is-info': true,
              'is-small': true,
              'is-outlined': true,
              'is-loading': loading,
            })}
          >
            Search
          </button>
        </div>
        <div className="control">
          <button onClick={dismiss} className="button is-small">
            Dismiss
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
