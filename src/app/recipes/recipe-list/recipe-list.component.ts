import { Subscription } from 'rxjs/Subscription';
import { RecipesService } from '../recipes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  subscription:Subscription
  constructor(private recipesService:RecipesService) { }
  
  ngOnInit() {
    this.recipes = this.recipesService.getRecipe();
    this.subscription = this.recipesService.onRecipeChanged.subscribe(
      (recapies:Recipe[]) =>{
        this.recipes = recapies;
      }

    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
