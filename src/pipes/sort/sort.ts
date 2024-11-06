import { Pipe, PipeTransform } from '@angular/core';
import { Importcontact } from '../../models/icontact.model';
import { Injectable } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  private importcontactlist: Importcontact[] = []; 
    transform(importcontactlist: Array<string>, args?: any): Array<string> {
    return importcontactlist.sort(function(a, b){
      if(a[args.displayName] < b[args.displayName]){
          return -1 * args.order;
      }
      else if( a[args.displayName] > b[args.displayName]){
          return 1 * args.order;
      }
      else{
          return 0;
      }
    });
  }


}
