import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const jquery: any;
declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sliderCarousel();
    this.zoomProduct();
    this.relatedProducts();
  }

  // slider for product
  sliderCarousel() {
    $('#gallery_01').owlCarousel({
      itemsCustom: [
        [0, 2],
        [412, 3],
        [600, 4],
        [768, 3],
        [992, 3],
        [1200, 3],
        [1590, 4]
      ],
      autoPlay: 2000,
      // autoPlay: true,
      navigation: false,
      navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      pagination: false
    });
  }
  //End - slider for product

  // zoom product start 
  zoomProduct() {
    if ($(window).width() >= 1200) {
      //initiate the plugin and pass the id of the div containing gallery images
      $("#zoom_03").elevateZoom({ gallery: 'gallery_01', cursor: 'pointer', galleryActiveClass: 'active', imageCrossfade: true, loadingIcon: '' });
      //pass the images to Fancybox
      $("#zoom_03").bind("click", function (e) {
        var ez = $('#zoom_03').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
      });
    }
  }
  // ZOOM END

  // Related Products
  relatedProducts() {
    $(document).ready(function () {
      $("#related").owlCarousel({
        itemsCustom: [
          [0, 1],
          [600, 2],
          [768, 2],
          [992, 3],
          [1200, 3],
          [1590, 4]
        ],
        // autoPlay: 1000,
        navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        navigation: true,
        pagination: false
      });
    });
  }
  //End - Related Products
}