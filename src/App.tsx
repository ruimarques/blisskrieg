import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import QuestionsPage from './QuestionsPage';
import LoadingPage from './LoadingPage';
import DetailsPage from './DetailsPage';
import SharePage from './SharePage';

function App() {
  return (
    <Router>
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
          <Offline />
        </Route>
        <Route path="/">
          <LoadingPage />
        </Route>
      </Switch>
    </Router>
  );
}

function Offline() {
  return <h2>Offline</h2>;
}

export default App;
