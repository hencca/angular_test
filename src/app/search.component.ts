import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { debounceTime, map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';


@Component({
    selector: 'search-component',
    templateUrl:'./search.component.html',
    styleUrls:['./search.component.css']
})
export class SearchComponent{
    
    public keyUp = new Subject<KeyboardEvent>();
    private subscription: Subscription;
    private edited:Object = null;
    
    results = null
    modifier = 1

    constructor(private searchservice:SearchService) {
        this.subscription = this.keyUp.pipe(
            map(event => event.target['value']),
            debounceTime(1000)
            ).subscribe(word=>this.search(word));
        }
        
        edit(item:Object) {
            this.edited = item
        }
        
        save(item) {
            this.edited = null;
        }
        
        sort(dir:any):void {
            const sorters = {
                sortbyname : (el1,el2)=>{ 
                    return el1.show.name > el2.show.name ? -1*this.modifier : 1*this.modifier
                },
             
                sortbyscore : (el1,el2)=>{ 
                    return el1.score > el2.score ? -1*this.modifier : 1*this.modifier
                }
            }

            this.results = this.results.sort(sorters[dir])
            this.modifier *= -1
        }
        
        search( word:String ) :void {
            this.searchservice.doSearch(word)
            .subscribe( d => {
                this.results = d;
            })
        }
    }   