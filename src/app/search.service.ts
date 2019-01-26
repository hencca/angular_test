import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';

@Injectable()
export class SearchService {

    constructor(private http:HttpClient) {
       
    }

    doSearch(val) {
        
        return this.http
        .get("http://api.tvmaze.com/search/shows?q="+val)
        
        
    }
}