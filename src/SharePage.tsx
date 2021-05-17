import { useState } from 'react';
import HeaderComponent from './components/Header';
import { useQuery } from './utils';
import styles from './App.module.css';
import { API_ENDPOINT } from './global-constants';

const SharePage = () => {
  const query = useQuery();
  const url = query.get('url') ?? '';

  const [input, setInput] = useState('');

  const onSend = (to: string) => {
    fetch(`${API_ENDPOINT}/share?destination_email=${to}&content_url=${url}`, {
      method: 'POST',
    });
  };

  return (
    <>
      <HeaderComponent title="Share" />
      <section className={styles.content}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">{'Sharing url'}</label>
          </div>
          <div className="field-body">
            <input
              className="input is-static"
              type="text"
              value={url}
              readOnly
            ></input>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">To</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
                  value={input}
                  onInput={(e) => setInput(e.currentTarget.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label"></div>
          <div className="field-body">
            <div className="control">
              <button className="button is-info" onClick={() => onSend(input)}>
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SharePage;
