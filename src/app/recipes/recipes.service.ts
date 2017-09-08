import { Observable} from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { ServerService } from '../server.service';
import { IngredientsService } from '../shopping-list/ingredients.service';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from "rxjs/Subject";

@Injectable()
 
export class RecipesService {

    constructor(private inService:IngredientsService,
    private serverService:ServerService){}
    
    onRecipeChanged = new Subject<Recipe[]>();

    private recipes :Recipe [] = [
        new Recipe(
            'Humberger',
            'Tasty Yammy',
            'http://librosebooks.org/img/xggS:XXc.kS.ku8v7S8g.W8CX-PN1h3TdlFcrX&tio44wZcyTXUUUUUUUUUu8Xh7TtIFghKm3X7tMnnXHUDz6hY6reUe.fSv.png'
            ,[new Ingredient("bread",2),
                new Ingredient("tomato",1) ,
                new Ingredient("cheese",1)
            ]),
       new Recipe(
            'Pizza',
            'Pizza is Life',
            'http://nebula.wsimg.com/6f2db64af78a9f2a338985524acc7669?AccessKeyId=0E852AD7261B4A32D299&disposition=0&alloworigin=1',
            [new Ingredient("cheese",2),
            new Ingredient("bacon",4),
            new Ingredient("tomato",1)
     ]),
     new Recipe(
         'khachaburi',
         'Amazing cheese inside',
         'http://i2.wp.com/foodperestroika.com/wp-content/uploads/2014/02/Khachapuri4-featured.jpg?fit=820%2C517',
         [new Ingredient('cheese',3),
        new Ingredient('bread',2)]
     )

    ];



    getRecipe(){
        return this.recipes.slice();
    }
    toShopping(ingredients: Ingredient[]){
        this.inService.addIngredients(ingredients);
    }
    getSelectedRecipe(index:number){
        return this.recipes.slice()[index];
    }
    saveRecipes(id:number,recipe:Recipe){
        this.recipes[id] = recipe
        this.onRecipeChanged.next(this.recipes.slice())
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.onRecipeChanged.next(this.recipes.slice())
    }
    deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.onRecipeChanged.next(this.recipes.slice())
    }
    //Http Requests Hundler
    saveRecipesReq(){
        this.serverService.save(this.recipes).subscribe(
            (response:Response) => {
                console.log(response);
            }
        )
    }
    fetchRecipeReq(){
       this.serverService.fetch().subscribe(
           (recipes) => {
               this.recipes = recipes;
               this.onRecipeChanged.next(this.recipes.slice());
           },
           (error) => {
               console.log(error);
               
           }
       )
    }

}
