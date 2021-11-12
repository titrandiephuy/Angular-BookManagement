import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { DeleteBookComponent } from './pages/delete-book/delete-book.component';
import { DetailBookComponent } from './pages/detail-book/detail-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { ListBookComponent } from './pages/list-book/list-book.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '',
    component: ListBookComponent
  },
  {
    path: 'create',
    component: CreateBookComponent
  },
  {
    path: 'edit/:id',
    component: EditBookComponent
  },
  {
    path: 'delete/:id',
    component: DeleteBookComponent
  },
  {
    path: 'detail/:id',
    component: DetailBookComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    CreateBookComponent,
    EditBookComponent,
    ListBookComponent,
    DetailBookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
