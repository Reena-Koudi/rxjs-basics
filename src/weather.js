import { ajax } from 'rxjs/ajax';
import { fromEvent, BehaviorSubject, Subject, from, combineLatest } from 'rxjs';
import {
  tap,
  debounce,
  debounceTime,
  switchMap,
  skipWhile,
  pluck
} from 'rxjs/operators';
import { add } from './helpers';

// Handles to our Elements
const searchBox = document.getElementById('search');
const resultsBox = document.getElementById('results-container');
const spinner = document.getElementById('spinner');

// Event Handlers
const searchEvent = fromEvent(searchBox, 'keyup');
const resultsEvent = fromEvent(resultsBox, 'click');

// Subjects
const inputSubject = new BehaviorSubject('');
const placeSubject = new Subject();
const weatherSubject = new Subject();

const inputData = inputSubject
  .pipe(
    skip(1),
    tap(() => {
      spinner.className = 'spinner';
    }),
    debounceTime(1000),
    switchMap(searchTerm => {
      return ajax
        .getJSON(`http://localhost:3000/autocomplete/${searchTerm}`)
        .pipe(
          tap(() => {
            spinner.className = '';
          }),
          switchMap(results => {
            return from(results);
          })
        );
    })
  )
  .subscribe(result => {
    add.result(result.description, result.place_id);
  });

searchEvent.subscribe(ev => {
  inputSubject.next(searchBox.value);
});

const placeData = resultsEvent
  .pipe(
    switchMap(ev => {
      const id = ev.target.getAttribute('data');
      return ajax.getJSON(`http://localhost:3000/place/${id}`);
    })
  )
  .subscribe(place => {
    placeSubject.next(place);
  });
