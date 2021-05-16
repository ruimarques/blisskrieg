import './App.css';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import QuestionsPage from './QuestionsPage';
import LoadingPage from './LoadingPage';
import DetailsPage from './DetailsPage';

// GET https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit={limit}&offset={offset}&filter={filter}
// GET /health
// GET /questions?limit={limit}&offset={offset}&filter={filter}
// GET /questions/{question_id}
// POST /questions
// PUT /questions/{question_id}
// POST /share?destination_email={destination_email}&content_url={content_url}

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
          <Share />
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

function Share() {
  return <h2>Share</h2>;
}

function Offline() {
  return <h2>Offline</h2>;
}

export default App;
