import { Pipe, PipeTransform } from '@angular/core';
import { Importcontact } from '../../models/icontact.model';
import { Injectable } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
private importcontactlist: Importcontact[] = []; 
  transform(importcontactlist: any[],searchTerm: string): any[] {
    if(!importcontactlist) return [];
    if(!searchTerm) return importcontactlist;
    searchTerm = searchTerm.toLowerCase();
    return importcontactlist.filter( item => {
    return item.displayName.toLowerCase().includes(searchTerm);
    });
  }
}
