import { Pipe, PipeTransform } from '@angular/core';
import { Job } from './Job';

@Pipe({
    name: 'matchfilter',
    pure: false
})
export class MatchFilterPipe implements PipeTransform {
    transform(items: Job[], args: string[]): any {
        //console.log("items: " + JSON.stringify(items));
        if(items == null || items.length == 0 || items.constructor != Array ){
            return [];
        }
        
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => {
            if(args.length > 0){
                return args.indexOf(item._id) == -1    
            }
            return true;
        });

    }
}