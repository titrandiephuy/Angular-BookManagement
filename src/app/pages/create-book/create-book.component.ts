import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  form!: FormGroup;

  control(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void { 
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]], // Tuple: [initialValue, [...Validators]]
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    })

  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Book added successfully !")
}
  submit(): void {
    if (this.form.invalid)
    {
      alert('Form is not valid')
    }
    else{
      const { title, author, description } = this.form.value;


      const book: Book = {
        title: title,
        author: author,
        description: description
  
      }
      this.showToasterSuccess();
      this.bookService.create(book);
      
  
      // Điều hướng về trang gốc
      this.router.navigateByUrl('/');
    }
    }
    
}
