import { Subject } from 'rxjs/Subject';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';


export class IngredientsService {
    onIngredientChanged = new Subject<Ingredient[]>();

    ingredientSubject = new Subject<number>();
    
    private ingredients: Ingredient[] = [];
    getIngredientEdit(index:number){
        return this.ingredients[index];
    }

    addIngredient(ing:Ingredient){
        this.ingredients.push(ing);
        this.onIngredientChanged.next(this.ingredients.slice());
    }
    updateIngredient(index:number, ing:Ingredient){
        this.ingredients[index] = ing;
        this.onIngredientChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.onIngredientChanged.next(this.ingredients.slice())
    }
    getIngredients(){
        return this.ingredients.slice();
    }
    addIngredients( ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.onIngredientChanged.next(this.ingredients.slice());
    }

}