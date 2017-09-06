import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../recipes.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input()recipe;
  @Input() indexx:number;

  constructor(private recipeService:RecipesService,
              private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit() {

    
  }
  
  // onSelect(){
  //   this.router.navigate([this.indexx],{relativeTo:this.route})
   
  // }
}
  
