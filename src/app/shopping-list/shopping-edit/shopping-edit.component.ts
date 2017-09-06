
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../../shared/ingredient.model'
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private ingredientsService :IngredientsService) { }
  @ViewChild('f') myForm:NgForm;
  subscription:Subscription;
  editMode:boolean=false;
  editIndex:number;
  editValues:Ingredient;

  ngOnInit() { 
    this.subscription = this.ingredientsService.ingredientSubject.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editValues = this.ingredientsService.getIngredientEdit(index);
        this.myForm.setValue({
          name:this.editValues.name,
          amount:this.editValues.amount
        })

      }
    )
  }
  onAddItem(form:NgForm){
    console.log(form);
    const ing = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.ingredientsService.updateIngredient(this.editIndex,ing)
    }else{
      this.ingredientsService.addIngredient(ing);
    }
    form.reset();
    this.editMode = false;
    
  }
  onDelete(){
    this.ingredientsService.deleteIngredient(this.editIndex);
    this.onReset();
  }
  onReset(){
    this.myForm.reset();
    this.editMode=false;

  }
  // addIngredient(name,amount){
  //   const ing = {name,amount}
  //   this.ingredientsService.addIngredient(ing);
  // }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
