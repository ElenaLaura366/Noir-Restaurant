import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Menu } from '../models/menu.model'

@Component({
  selector: 'app-menu',
  imports: [FooterComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data: Menu[]) => {
      this.menu = data;
    });
  }
}