import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRouteModule } from './routeModule/app-route.module';

import { ServerService } from './server.service';
import { IngredientsService } from './shopping-list/ingredients.service';
import { RecipesService } from "./recipes/recipes.service";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { Dropdown } from './shared/dropdown.directive'
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    Dropdown,
    RecipeStartComponent,
    RecipeEditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
    
  ],
  providers: [IngredientsService,RecipesService,ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
