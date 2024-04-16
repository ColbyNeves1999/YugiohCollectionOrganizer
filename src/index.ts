import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors
import express, { Express } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

import { indexPage } from './controllers/pageController';
import { getCardsFromPlace, incrementMain, decrementMain, incrementExtra, decrementExtra } from './controllers/cardController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public', { extensions: ['html'] }));
app.set('views', '/Users/colby.neves/Documents/projects/YugiohCollectionOrganizer/views/partials');
app.set('view engine', 'ejs');

app.get('/', indexPage);

app.post('/cards', getCardsFromPlace);
app.post('/incrementMain', incrementMain);
app.post('/decrementMain', decrementMain);
app.post('/incrementExtra', incrementExtra);
app.post('/decrementExtra', decrementExtra);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });