import { RecipesService } from '../recipes/recipes.service';
import { Component } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
    
})

export class HeaderComponent {
    constructor(private recipeService:RecipesService){}
    onSave(){
        this.recipeService.saveRecipesReq();
    }
    onFetch(){
        this.recipeService.fetchRecipeReq();

    }
 
}