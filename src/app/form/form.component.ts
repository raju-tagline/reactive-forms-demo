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
  public errorMinPrice: any = '';
  public errorMaxDiscount: any = '';
  public errorSubCategoryMessage: any = '';
  public finalProduct: any;
  public commaMinPrice: any;
  public commaMaxDiscount: any;
  public subCatRequired: boolean = false;
  public isMinPrice: boolean = false;
  public isMaxDiscount: boolean = false;

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
      subCategory: new FormControl(''),
      min_price: new FormControl('', [Validators.required]),
      max_discount: new FormControl('', [Validators.required]),
    });
  }

  get accessProduct() {
    return this.productForm.controls['product'];
  }

  get accessCategory() {
    return this.productForm.controls['category'];
  }

  get accessSubCategory() {
    return this.productForm.controls['subCategory'];
  }

  get accessMaxDiscount() {
    return this.productForm.controls['max_discount'];
  }

  get accessMinPrice() {
    return this.productForm.controls['min_price'];
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
      this.accessSubCategory.addValidators(Validators.required);
      this.accessSubCategory.updateValueAndValidity();
      this.subCatRequired = true;
      this.errorSubCategoryMessage = 'Sub-category is required!';
    } else {
      this.accessSubCategory.clearValidators();
      this.accessSubCategory.updateValueAndValidity();
      this.subCatRequired = false;
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
  public changeMinPrice(event: any): any {
    if (this.categoryList?.length) {
      const index: any = this.categoryList.filter(
        (res: any) => res.key === this.productForm.value.category
      );
      this.productForm.valueChanges.subscribe((res: any) => {
        if (res && res.min_price) {
          const str: any = event.target.value.replace(/,/g, '');
          this.commaMinPrice = str;
        }
      });
      const values: any = Number(event.target.value.replace(/,/g, ''));
      if (values <= index[0]?.min_price) {
        this.isMinPrice = true;
      } else {
        this.isMinPrice = false;
      }
      this.isMinPrice = false;
      if (values <= index[0]?.min_price) {
        this.accessMinPrice.addValidators(Validators.min(index[0]?.min_price));
        this.accessMinPrice.updateValueAndValidity();
        this.errorMinPrice =
          this.accessMinPrice?.errors?.['required'] &&
          this.accessMinPrice?.touched &&
          !this.accessMinPrice?.value?.length
            ? ''
            : `Minimum price of product is ${index[0]?.min_price}`;
      } else {
        // this.accessMinPrice.removeValidators(
        //   Validators.min(this.accessMaxDiscount.errors?.['min']?.['min'])
        // );
        this.accessMinPrice.clearValidators();
        this.accessMinPrice.updateValueAndValidity();
        this.errorMinPrice = '';
      }
    }
  }

  /**
   * changeMaxDiscount
   */
  public changeMaxDiscount(event: any) {
    if (this.categoryList?.length) {
      const index: any = this.categoryList.filter(
        (res: any) => res.key === this.productForm.value.category
      );
      this.productForm.valueChanges.subscribe((res: any) => {
        if (res && res.max_discount) {
          const str: any = event.target.value.replace(/,/g, '');
          this.commaMaxDiscount = str;
        }
      });
      const values: any = Number(event.target.value.replace(/,/g, ''));
      if (values >= index[0]?.max_discount) {
        this.accessMaxDiscount.addValidators(
          Validators.max(index[0]?.max_discount)
        );
        this.accessMaxDiscount.updateValueAndValidity();
        this.errorMaxDiscount =
          this.accessMaxDiscount?.errors?.['required'] &&
          this.accessMaxDiscount?.touched &&
          !this.accessMaxDiscount?.value?.length
            ? ''
            : `Maxmum discount of product is ${index[0]?.max_discount}`;
      } else {
        // this.accessMaxDiscount.removeValidators(
        //   Validators.max(this.accessMaxDiscount.errors?.['max']?.['max'])
        // );
        this.accessMaxDiscount.clearValidators();
        this.accessMaxDiscount.updateValueAndValidity();
        this.errorMaxDiscount = '';
      }
    }
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (!this.productForm.valid) {
      return;
    } else {
      this.subCatRequired = false;
      this.categoryList = [];
      this.subCategoryList = [];
      this.accessSubCategory.clearValidators();
      this.accessMinPrice.clearValidators();
      this.accessMaxDiscount.clearValidators();
      this.accessSubCategory.updateValueAndValidity();
      this.accessMinPrice.updateValueAndValidity();
      this.accessMaxDiscount.updateValueAndValidity();
      console.log('Product Details :::>> ', this.productForm.value);
      this.productForm.reset();
      this.accessMinPrice.addValidators(Validators.required);
      this.accessMaxDiscount.addValidators(Validators.required);
      this.accessMinPrice.updateValueAndValidity();
      this.accessMaxDiscount.updateValueAndValidity();
    }
  }
}
