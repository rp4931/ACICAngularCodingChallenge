import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { Quote } from '../Quote';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  quotes: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private QuoteService: QuoteService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
    this.getNumberOfQuotes();
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => {
        this.lineOfBusiness = lineOfBusiness;
      });
  }
  getNumberOfQuotes(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.QuoteService.getNumberOfQuotesById(id)
      .subscribe(quote => {
        this.quotes = quote.numberOfQuotes;
      });
    }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
