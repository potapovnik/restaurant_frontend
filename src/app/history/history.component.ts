import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HistoryService} from '../utils/history.service';
import {Statistic} from '../utils/Statistic';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  _statisticForm: FormGroup;
  statistic: Statistic = new Statistic();
  usedIngredients: Map<string, number>;
  soldDishes: Map<string, number>;

  columnsToDisplay = ['name', 'count'];

  constructor(private fb: FormBuilder, private historyService: HistoryService) {
    this._statisticForm = fb.group({
      fromDate: fb.control(undefined, [Validators.required]),
      toDate: fb.control(undefined, [Validators.required])
    });
  }

  ngOnInit() {
    this.statistic.soldDishes = [];
    this.statistic.usedIngredients = [];
    this.usedIngredients = new Map<string, number>();
    this.soldDishes = new Map<string, number>();
  }

  getStatistic() {
    const from = new Date(this._statisticForm.controls['fromDate'].value);
    const to = new Date(this._statisticForm.controls['toDate'].value);
    this.historyService.getStatistic(from.getTime().toString(), to.getTime().toString())
      .subscribe((d: Statistic) => {
        this.statistic = d;
        for (const [key, value] of Object.entries(d.usedIngredients)) {
          this.usedIngredients.set(key, value);
        }
        for (const [key, value] of Object.entries(d.soldDishes)) {
          this.soldDishes.set(key, value);
        }
      });
  }
}

export interface KeyValue {
  key: string;
  value: number;
}
