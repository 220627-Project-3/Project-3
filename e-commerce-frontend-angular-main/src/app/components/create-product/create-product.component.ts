import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  product: Product = new Product(0, '', 0, '', 0, '');

  environment = environment;

  formProductImage: FormGroup;

  showError: boolean = false;
  showSuccess: boolean = false;
  showLoading: boolean = false;

  imageBackup: any = '';
  imagePreviewUrl: any = 'assets/images/default-product-image.png';

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
        // this.param_id = data.id;
        //this.retrieveProductData(this.param_id);
      },
      error: (err) => console.log(err),
    });
  }

  createDetails(event: Event) {
    this.showError = false;
    this.showSuccess = false;
    this.showLoading = true;
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this._productService.createProduct(this.product).subscribe({
        next: (data) => {
          //console.log(data);
          let createdProduct = data as Product;
          let formData: any = new FormData();
          formData.append(
            'productimage',
            this.formProductImage.get('productimage')?.value
          );
          if (this.formProductImage.get('productimage')?.value != null) {
            // console.log(formData);
            this._productService
              .uploadProductImage(createdProduct.id, formData)
              .subscribe({
                next: (response) => {
                  //console.log(response);
                  this.showSuccess = true;
                  this.showConfirmUpload = false;
                },
                error: (error) => {
                  console.log(error);
                  this.showLoading = false;
                  this.showError = true;
                },
                complete: () => {
                  this.showLoading = false;
                },
              });
          } else {
            console.log("No image uploaded");
            this.showSuccess = true;
            this.showConfirmUpload = false;
            this.showLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.showLoading = false;
          this.showError = true;
        },
      });
    }
    form.classList.add('was-validated');
  }

  createImage() {}

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
      //console.log(inputFile.files[0]);
      //console.log(this.formProductImage);

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
    this._productService.getSingleProduct(id).subscribe({
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
