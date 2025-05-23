import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter , signal, ChangeDetectionStrategy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Item } from './item';
import { ItemComponent } from './item/item.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, ItemComponent, MatInputModule, MatIconModule, MatDividerModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule],
  styleUrl: './app.component.css',
  templateUrl: "./app.component.html",
})

export class AppComponent {
  editable = false;



  componentTitle = "My to-do list";
  filter: "all" | "active" |  "done"  = "all";
  allItems = [
    { description: "eat", done: true },
    {description: "sleep", done: false },
    {description: "play", done: false},
    {description: "laugh", done: false},
  ];
  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item) => 
      this.filter === "done" ? item.done : !item.done
  );
  }
  addItem(description: string) {
    if (!description) return;

    this.allItems.unshift({
      description,
      done: false,
    });
  }
  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
   // optional trackBy to keep list performant
  trackByDescription(_: number, itm: Item) {
    return itm.description;
  }




  hideSingleSelectionIndicator = signal(false);
  hideMultipleSelectionIndicator = signal(false);

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }

  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update(value => !value);
  }


}