import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;
  recForm:FormGroup;
  newRecipe:Recipe

  constructor(private route : ActivatedRoute,
              private recipesService:RecipesService,
            private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.id, this.editMode );
        this.onRecipeInit()
        
      }
    );
    console.log((<FormArray>this.recForm.get('ingredient')).controls);
    
  }

  private onRecipeInit(){
   
    let name = '';
    let imagePath = '';
    let description = '';
    let recIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipesService.getSelectedRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredient']) {
        for(let ing of recipe.ingredient){
          recIngredients.push(
            new FormGroup({
              'name': new FormControl( ing.name , Validators.required),
              'amount': new FormControl( ing.amount , [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
            
          )
        }
      }
      
      
    }
    this.recForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredient': recIngredients
    })
    
  }
  navAway(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
   
  onSave(){
    this.newRecipe = {
      name:this.recForm.get('name').value,
      description:this.recForm.get('description').value,
      imagePath:this.recForm.get('imagePath').value,
      ingredient:this.recForm.get('ingredient').value
    }
    if(this.editMode){
      this.recipesService.saveRecipes(this.id,this.newRecipe)
    }else{
      this.recipesService.addRecipe(this.newRecipe)
    }
    console.log(this.recForm.value);
    this.navAway();
  }

  onAddIngedient(){
    (<FormArray>this.recForm.get('ingredient')).push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onX(i:number){
    (<FormArray>this.recForm.get('ingredient')).removeAt(i);
  }

}
