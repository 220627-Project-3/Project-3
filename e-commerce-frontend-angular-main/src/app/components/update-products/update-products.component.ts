import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css'],
})
export class UpdateProductsComponent implements OnInit {
  param_id: string = '';

  product: Product = new Product(0, '', 0, '', 0, '');

  environment = environment;

  formProductImage: FormGroup;

  showError: boolean = false;
  showSuccess: boolean = false;
  showLoading: boolean = false;
  showLoadingImage: boolean = false;

  imageBackup: any = '';
  imagePreviewUrl: any = '/assets/images/default-product-image.png';

  showConfirmUpload: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _fb: FormBuilder
  ) {
    this.formProductImage = this._fb.group({
      productimage: [null],
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (data) => {
        this.param_id = data.id;
        this.retrieveProductData(this.param_id);
      },
      error: (err) => console.log(err),
    });
  }

  updateDetails(event: Event) {
    this.showError = false;
    this.showSuccess = false;
    this.showLoading = true;
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this._productService.updateProduct(this.product).subscribe({
        next: (data) => {
          console.log(data);
          this.showSuccess = true;
        },
        error: (err) => {
          console.log(err);
          this.showError = true;
        },
        complete: () => {
          this.showLoading = false;
        },
      });
    }
    form.classList.add('was-validated');
  }

  updateImage() {}

  submitProductImage() {
    let formData: any = new FormData();
    this.showLoadingImage = true;
    formData.append(
      'productimage',
      this.formProductImage.get('productimage')?.value
    );
    console.log(formData);
    this._productService
      .uploadProductImage(this.product.id, formData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.showConfirmUpload = false;
        },
        error: (error) => console.log(error),
        complete: () => {
          this.showLoadingImage = false;
        },
      });
  }

  cancelUploadImage() {
    this.showConfirmUpload = false;
    this.imagePreviewUrl = this.imageBackup;
  }

  selectProductImage(event: Event) {
    let inputFile = event.currentTarget as HTMLInputElement;
    if (inputFile.files && inputFile.files[0]) {
      this.formProductImage.patchValue({
        productimage: inputFile.files[0],
      });
      console.log(inputFile.files[0]);
      console.log(this.formProductImage);

      this.formProductImage.get('productimage')?.updateValueAndValidity();

      let reader = new FileReader();

      reader.readAsDataURL(inputFile.files[0]);
      reader.onload = (event) => {
        this.imageBackup = this.imagePreviewUrl;
        this.imagePreviewUrl = event.target?.result;
        this.showConfirmUpload = true;
      };
    }
  }

  retrieveProductData(param_id: string) {
    const id = parseInt(param_id);
    this._productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.imagePreviewUrl =
          this.environment.baseUrl +
          '/api/product/image/byProductId/' +
          this.product.id;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectProductPhoto(event: Event) {}
}
