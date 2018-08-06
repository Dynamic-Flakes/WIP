import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const jquery: any;
declare const jQuery: any;
declare const $: any;


@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.headermenu();
  }

  headermenu() {
    if ($(window).width() < 768) {
      $('ul.nav li.dropdown a.header-menu').attr("data-toggle", "dropdown");
    }
    else {
      $('ul.nav li.dropdown a.header-menu').attr("data-toggle", "");
    }
  }



}
