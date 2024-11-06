import { Pipe, PipeTransform } from '@angular/core';
import { Localcontact } from '../models/lcontact.model';

@Pipe({
  name: 'sortcontact',
})
export class Sortcontact implements PipeTransform {
  private localcontactlist: Localcontact[] = []; 
  transform(value: string, ...args) {
    // This is our catch for data that hasn't interpolated
    // from its source yet, a basic async fix.
    if(value == null) return;// Otherwise, lookup the state name from the acronym
    if(this.localcontactlist[value]){
      return this.localcontactlist[value];
    } else {
      return value;
    }
  }
}