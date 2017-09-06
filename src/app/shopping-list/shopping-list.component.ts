import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { IngredientsService } from "./ingredients.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = [];
  constructor(private ingredientsService:IngredientsService) { }
  onSelectEdit(index:number){
    this.ingredientsService.ingredientSubject.next(index);

  }
  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients();
    this.ingredientsService.onIngredientChanged.subscribe(
      (newIIngredients) =>{
        this.ingredients = newIIngredients;
      }
    )
  }

}
