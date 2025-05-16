import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProductsTableComponent } from './components/products/products-table/products-table.component';
import { CategoriessTableComponent } from './components/categories/categoriess-table/categoriess-table.component';
import { PopUpComponent } from './components/ui/pop-up/pop-up.component';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { CategoriesPageComponent } from './pages/categories/categories-page/categories-page.component';
import { FormsModule as AppFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesUpdateFormComponent } from './components/categories/categories-update-form/categories-update-form.component';
import { ProductsPageComponent } from './pages/products/products-page/products-page.component';
import { ProductUpdateFormComponent } from './components/products/product-update-form/product-update-form.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { AddProductPageComponent } from './pages/products/add-product-page/add-product-page.component';
import { UpdateProductPageComponent } from './pages/products/update-product-page/update-product-page.component';
import { TagsTableComponent } from './components/tags/tags-table/tags-table.component';
import { TagsFormComponent } from './components/tags/tags-form/tags-form.component';
import { TagsUpdateFormComponent } from './components/tags/tags-update-form/tags-update-form.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';
import { HomePageComponent } from './pages/client-side-pages/home-page/home-page.component';
import { NavBarComponent } from './components/ui/nav-bar/nav-bar.component';
import { LoginPageComponent } from './pages/user/login-page/login-page.component';
import { RegisterPageComponent } from './pages/user/register-page/register-page.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { RegisterClientPageComponent } from './pages/user/register-client-page/register-client-page.component';
import { AuthInterceptor } from './guards/AuthInterceptor';
import { DatePipe } from '@angular/common';
import { ProductsClientPageComponent } from './pages/products/products-client-page/products-client-page.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductInfoComponent } from './pages/products/product-info/product-info.component';
import { CategoryCardComponent } from './components/categories/category-card/category-card.component';
import { CategoriesClientPageComponent } from './pages/categories/categories-client-page/categories-client-page.component';
import { CategoryInfoComponent } from './pages/categories/category-info/category-info.component';
import { PanierOverlayComponent } from './components/orders/panier-overlay/panier-overlay.component';
import { CheckoutPageComponent } from './pages/orders/checkout-page/checkout-page.component';
import { CardPageComponent } from './pages/orders/card-page/card-page.component';
import { ProfileOverlayComponent } from './components/user/profile-overlay/profile-overlay.component';
import { OrdersAdminPageComponent } from './pages/orders/orders-admin-page/orders-admin-page.component';
import { OrderTableComponent } from './components/orders/order-table/order-table.component';
import { OrderCardComponent } from './components/orders/order-card/order-card.component';
import { OrdersClientPageComponent } from './pages/orders/orders-client-page/orders-client-page.component';
import { PrimeNgModule } from './primeng/primeng.module';
import { PaypalModule } from './payments/paypal/paypal.module';
import { AboutComponent } from './pages/client-side-pages/about/about.component';
import { OrderInfoComponent } from './components/orders/order-info/order-info.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { StateCardComponent } from './components/statistics/state-card/state-card.component';
import { InfluencersPageComponent } from './pages/influencers/influencers-page/influencers-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfluencersTableComponent } from './components/influencers/influencers-table/influencers-table.component';
import { InfluencerFormComponent } from './components/influencers/influencer-form/influencer-form.component';
import { PromoCodesFormComponent } from './components/promo-codes/promo-codes-form/promo-codes-form.component';
import { PromoCodesPageComponent } from './pages/promo-codes/promo-codes-page/promo-codes-page.component';
import { PromoCodesTableComponent } from './components/promo-codes/promo-codes-table/promo-codes-table.component';
import { CommissionsTableComponent } from './components/commission/commissions-table/commissions-table.component';
import { CommissionsPageComponent } from './pages/commission/commissions-page/commissions-page.component';

export function tokenGetter() {
  const token = getCookie('token');
  return  token != undefined ? token : null
}

export function getCookie(name: string): string | undefined {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop(): undefined;
}

const jwtModuleOptions: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    DashboardPageComponent,
    ProductsTableComponent,
    CategoriessTableComponent,
    PopUpComponent,
    CategoriesFormComponent,
    CategoriesPageComponent,
    CategoriesUpdateFormComponent,
    ProductsPageComponent,
    ProductUpdateFormComponent,
    ProductFormComponent,
    AddProductPageComponent,
    UpdateProductPageComponent,
    TagsTableComponent,
    TagsFormComponent,
    TagsUpdateFormComponent,
    TagsPageComponent,
    HomePageComponent,
    NavBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterClientPageComponent,
    ProductsClientPageComponent,
    ProductCardComponent,
    ProductInfoComponent,
    CategoryCardComponent,
    CategoriesClientPageComponent,
    CategoryInfoComponent,
    PanierOverlayComponent,
    CheckoutPageComponent,
    CardPageComponent,
    ProfileOverlayComponent,
    OrdersAdminPageComponent,
    OrderTableComponent,
    OrderCardComponent,
    OrdersClientPageComponent,
    AboutComponent,
    OrderInfoComponent,
    FooterComponent,
    ClientLayoutComponent,
    StateCardComponent,
    InfluencersPageComponent,
    InfluencersTableComponent,
    InfluencerFormComponent,
    PromoCodesTableComponent,
    PromoCodesFormComponent,
    PromoCodesPageComponent,
    CommissionsTableComponent,
    CommissionsPageComponent
  ],
  imports: [
    PaypalModule,
    PrimeNgModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot(jwtModuleOptions)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true, 
  },DatePipe],
  bootstrap: [AppComponent]
  ,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
