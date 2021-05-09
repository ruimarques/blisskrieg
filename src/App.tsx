import './App.css';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import QuestionsComponent from './Questions';

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
          <Details />
        </Route>
        <Route path="/questions">
          <QuestionsComponent />
        </Route>
        <Route path="/share">
          <Share />
        </Route>
        <Route path="/offline">
          <Offline />
        </Route>
        <Route path="/">
          <Loading />
        </Route>
      </Switch>
    </Router>
  );
}

function Details() {
  return <h2>Details</h2>;
}

function Share() {
  return <h2>Share</h2>;
}

function Offline() {
  return <h2>Offline</h2>;
}

function Loading() {
  return <h2>Loading</h2>;
}
export default App;
