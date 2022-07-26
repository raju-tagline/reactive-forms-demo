import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as productDetails from '../product.json';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public productForm!: FormGroup;
  public productDetailList: any = Object.values(productDetails)[3];
  public categoryList: any;
  public subCategoryList: any;
  public errorMinPrice: any;
  public errorMaxDiscount: any;
  public errorSubCategoryMessage: any;
  public finalProduct: any;
  public commaMinPrice: any;

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * createForm
   */
  public createForm() {
    this.productForm = new FormGroup({
      product: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      subCategory: new FormControl('', Validators.required),
      min_price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      max_discount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  /**
   * changeCity
   */
  public changeCity(event: any) {
    const index: any = this.productDetailList.findIndex(
      (res: any) => res.product.key === event.target.value
    );
    this.categoryList = this.productDetailList[index]?.category;
  }

  /**
   * changeCategory
   */
  public changeCategory(event: any) {
    const index: any = this.categoryList.findIndex(
      (res: any) => res.key === event.target.value
    );
    if (this.categoryList[index].is_subcat_required) {
      this.errorSubCategoryMessage = 'Sub-category is required!';
      this.productForm.invalid;
    } else {
      this.errorSubCategoryMessage = '';
    }
    this.subCategoryList = this.categoryList[index]?.sub_category;
  }
  /**
   * changeSubCategory
   */
  public changeSubCategory(event: any) {
    if (event.target.value.length) {
      this.errorSubCategoryMessage = '';
    }
  }

  /**
   * changeMinPrice
   */
  public changeMinPrice(event: any):any {
    if (this.categoryList?.length) {
      const index: any = this.categoryList.filter(
        (res: any) => res.key === this.productForm.value.category
      );
      this.productForm.valueChanges.subscribe((res: any) => {
        if (res && res.min_price) {
          this.commaMinPrice = event.target.value
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      });
      if (event.target.value <= index[0].min_price) {
        this.errorMinPrice = `Minimum price of product is ${index[0].min_price}`;
        this.productForm.invalid;
      } else {
        this.errorMinPrice = '';
      }
      this.errorMinPrice = '';
    } else {
      this.errorMinPrice = 'Please select above dropdown!';
      return (event.target.value = null);
    }
  }

  /**
   * changeMaxDiscount
   */
  public changeMaxDiscount(event: any) {
    const index: any = this.categoryList.filter(
      (res: any) => res.key === this.productForm.value.category
    );
    if (event.target.value >= index[0].max_discount) {
      this.errorMaxDiscount = `Maxmum discount of product is ${index[0].max_discount}`;
      this.productForm.invalid;
    } else {
      this.errorMaxDiscount = '';
    }
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (!this.productForm.valid) {
      return;
    } else {
      this.finalProduct = this.productForm.value;
      this.productForm.reset();
    }
  }
}
