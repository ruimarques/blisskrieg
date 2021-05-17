import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import QuestionsPage from './QuestionsPage';
import LoadingPage from './LoadingPage';
import DetailsPage from './DetailsPage';
import SharePage from './SharePage';
import OfflinePage from './OfflinePage';

function App() {
  const history = useHistory();

  useEffect(() => {
    window.addEventListener('online', () => {
      console.log('Became online');
      history.goBack();
    });

    window.addEventListener('offline', () => {
      console.log('Became offline');
      history.push('/offline');
    });
  });

  return (
    <Switch>
      <Route path="/questions/:id">
        <DetailsPage />
      </Route>
      <Route path="/questions">
        <QuestionsPage />
      </Route>
      <Route path="/share">
        <SharePage />
      </Route>
      <Route path="/offline">
        <OfflinePage />
      </Route>
      <Route path="/">
        <LoadingPage />
      </Route>
    </Switch>
  );
}

export default App;
