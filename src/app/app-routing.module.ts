import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CategoriesPageComponent } from './pages/categories/categories-page/categories-page.component';
import { ProductsPageComponent } from './pages/products/products-page/products-page.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { AddProductPageComponent } from './pages/products/add-product-page/add-product-page.component';
import { UpdateProductPageComponent } from './pages/products/update-product-page/update-product-page.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';
import { HomePageComponent } from './pages/client-side-pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/user/login-page/login-page.component';
import { RegisterClientPageComponent } from './pages/user/register-client-page/register-client-page.component';
import { AuthGuard } from './guards/Auth.guard';
import { ProductsClientPageComponent } from './pages/products/products-client-page/products-client-page.component';
import { ProductInfoComponent } from './pages/products/product-info/product-info.component';
import { CategoriesClientPageComponent } from './pages/categories/categories-client-page/categories-client-page.component';
import { CategoryInfoComponent } from './pages/categories/category-info/category-info.component';
import { CardPageComponent } from './pages/orders/card-page/card-page.component';
import { CheckoutPageComponent } from './pages/orders/checkout-page/checkout-page.component';
import { OrdersAdminPageComponent } from './pages/orders/orders-admin-page/orders-admin-page.component';
import { OrdersClientPageComponent } from './pages/orders/orders-client-page/orders-client-page.component';
import { AboutComponent } from './pages/client-side-pages/about/about.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
  { path: 'products', component: ProductsClientPageComponent},
  { path: 'categories', component: CategoriesClientPageComponent},
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Client'] }},
  { path: 'card', component: CardPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Client'] }},
  { path: 'orders', component: OrdersClientPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Client'] }},
  { path: 'products/:id', component: ProductInfoComponent},
  { path: 'categories/:id', component: CategoryInfoComponent},
  { path: 'dashboard/categories', component: CategoriesPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
  { path: 'dashboard/products', component: ProductsPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
  { path: 'dashboard/orders', component: OrdersAdminPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
  { path: 'dashboard/tags', component: TagsPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterClientPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard/products/new', component: AddProductPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
  { path: 'dashboard/products/update/:id', component: UpdateProductPageComponent, canActivate: [AuthGuard], data: { allowedRoles: ['Admin'] }},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
