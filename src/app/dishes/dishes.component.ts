import {Component, OnInit} from '@angular/core';
import {Dish} from './Dish';
import {DishService} from './dish.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  dishes: Dish[];
  newDish: Dish = new Dish();

  constructor(private dishesService: DishService) {
  }

  ngOnInit() {
    this.dishesService.getAllDishes().subscribe((data: Dish[]) => this.dishes = data);
  }

  createDish() {
    this.dishesService.createDish(this.newDish);
  }
}
