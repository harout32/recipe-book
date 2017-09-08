import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()

export class ServerService {
    constructor(private http:Http){}
save(recipe){
    return this.http.put('https://recipe-book-e74d0.firebaseio.com/recipes.json',recipe)
}
fetch(){
    return  this.http.get('https://recipe-book-e74d0.firebaseio.com/recipes.json').map(
        (response:Response) => {
            return response.json();
        }
    ).catch(
        (error:Response) =>{
            return Observable.throw('Something Went Wrong');
        }
    )
}
}