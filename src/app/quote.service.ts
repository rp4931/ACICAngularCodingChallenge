import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { InMemoryDataService } from './in-memory-data.service';
import { Quote } from './Quote';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  constructor(
    private messageService: MessageService,
    private dataService: InMemoryDataService
  ) {}

  getNumberOfQuotesById(id: number): Observable<Quote> {
    const recentQuotes = this.dataService.createDb().recentQuotes;
    const numberOfQuotes = recentQuotes.filter(
      (quote) => quote.lineOfBusiness === id
    ).length;

    const quote : Quote = {
        lineOfBusinessId: id,
        numberOfQuotes: numberOfQuotes
    };
    this.log(`fetched number of quotes for line of business id=${id}`);
    return of(quote);
  }
  private log(message: string) {
    this.messageService.add(`LineOfBusinessService: ${message}`);
  }
}
