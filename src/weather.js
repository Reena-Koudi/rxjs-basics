import { fromEvent } from 'rxjs';
import {} from 'rxjs/operators';
import {} from './helpers';

// Handles to our Elements
const searchBox = document.getElementById('search');
const resultsBox = document.getElementById('results-container');

// Event Handlers
const searchEvent = fromEvent(searchBox, 'keyup');
const resultsEvent = fromEvent(resultsBox, 'click');

// Subjects
const inputSubject = new BehaviorSubject('');
const placeSubject = new Subject();
const weatherSubject = new Subject();
