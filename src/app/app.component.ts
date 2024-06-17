import { Component, OnInit } from '@angular/core';
import { LineOfBusinessService } from './lineOfBusiness.service';
import { QuoteService } from './quote.service';
import { Quote } from './Quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Agency Authority - Insurance Coverages Allowed to be Rated';
  topTwoLinesOfBusiness: { name: string; description: string; numberOfQuotes: number }[] = [];
  constructor(
    private lineOfBusinessService: LineOfBusinessService,
    private quoteService: QuoteService
  ) {}
  ngOnInit(): void {
    this.getTopTwoLinesOfBusiness();
  }
  getTopTwoLinesOfBusiness(): void {
    const linesOfBusiness = this.lineOfBusinessService.getTopTwoLinesOfBusiness();
    linesOfBusiness.forEach(line => {
      this.quoteService.getNumberOfQuotesById(line.id).subscribe((quote: Quote) => {
        this.topTwoLinesOfBusiness.push({
          name: line.name,
          description: line.description,
          numberOfQuotes: quote.numberOfQuotes
        } as { name: string; description: string; numberOfQuotes: number });
      });
    });
  }
}
