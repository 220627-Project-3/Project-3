// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
// import { ProductService } from 'src/app/services/product.service';
// import { FormBuilder } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { environment } from 'src/environments/environment';
// import { FormsModule } from '@angular/forms';
// import { UpdateProductsComponent } from './update-products.component';
// import { Product } from 'src/app/models/product';

// describe('UpdateProductsComponent', () => {
//   let component: UpdateProductsComponent;
//   let fixture: ComponentFixture<UpdateProductsComponent>;

//   beforeEach(() => {
//     const activatedRouteStub = () => ({ params: { subscribe: (f) => f({}) } });
//     const routerStub = () => ({ navigate: (array) => ({}) });
//     const productServiceStub = () => ({
//       updateProduct: (product) => ({ subscribe: (f) => f({}) }),
//       uploadProductImage: (id, formData) => ({ subscribe: (f) => f({}) }),
//       getProductById: (id) => ({ subscribe: (f) => f({}) }),
//       deleteProduct: (product) => ({ subscribe: (f) => f({}) }),
//     });
//     const formBuilderStub = () => ({ group: (object) => ({}) });
//     const toastrServiceStub = () => ({
//       success: (string, string1) => ({}),
//       error: (string, string1) => ({}),
//     });
//     TestBed.configureTestingModule({
//       imports: [FormsModule],
//       schemas: [NO_ERRORS_SCHEMA],
//       declarations: [UpdateProductsComponent],
//       providers: [
//         { provide: ActivatedRoute, useFactory: activatedRouteStub },
//         { provide: Router, useFactory: routerStub },
//         { provide: ProductService, useFactory: productServiceStub },
//         { provide: FormBuilder, useFactory: formBuilderStub },
//         { provide: ToastrService, useFactory: toastrServiceStub },
//       ],
//     });
//     fixture = TestBed.createComponent(UpdateProductsComponent);
//     component = fixture.componentInstance;
//   });

//   it('can load instance', () => {
//     expect(component).toBeTruthy();
//   });

//   it(`environment has default value`, () => {
//     expect(component.environment).toEqual(environment);
//   });

//   it(`showError has default value`, () => {
//     expect(component.showError).toEqual(false);
//   });

//   it(`showSuccess has default value`, () => {
//     expect(component.showSuccess).toEqual(false);
//   });

//   it(`showLoading has default value`, () => {
//     expect(component.showLoading).toEqual(false);
//   });

//   it(`showLoadingImage has default value`, () => {
//     expect(component.showLoadingImage).toEqual(false);
//   });

//   it(`imagePreviewUrl has default value`, () => {
//     expect(component.imagePreviewUrl).toEqual(
//       `/assets/images/default-product-image.png`
//     );
//   });

//   it(`showConfirmUpload has default value`, () => {
//     expect(component.showConfirmUpload).toEqual(false);
//   });

//   describe('deleteProduct', () => {
//     it('makes expected calls', () => {
//       const routerStub: Router = fixture.debugElement.injector.get(Router);
//       const productServiceStub: ProductService =
//         fixture.debugElement.injector.get(ProductService);
//       const toastrServiceStub: ToastrService =
//         fixture.debugElement.injector.get(ToastrService);
//       component.product = {
//         id: 1,
//         name: 'name',
//         quantity: 1,
//         price: 1,
//         description: 'description',
//         image: 'image',
//       };
//       spyOn(routerStub, 'navigate').and.callThrough();
//       spyOn(productServiceStub, 'deleteProduct').and.callThrough();
//       spyOn(toastrServiceStub, 'success').and.callThrough();
//       spyOn(toastrServiceStub, 'error').and.callThrough();
//       component.deleteProduct();
//       expect(routerStub.navigate).toHaveBeenCalled();
//       expect(productServiceStub.deleteProduct).toHaveBeenCalled();
//       expect(toastrServiceStub.success).toHaveBeenCalled();
//       expect(toastrServiceStub.error).toHaveBeenCalled();
//     });
//   });
// });
