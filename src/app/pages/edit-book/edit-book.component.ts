import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  form!: FormGroup;
  id!: number | null;

  control(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void { // Lifecycle Hooks
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]], // Tuple: [initialValue, [...Validators]]
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]

    })

    this.fetchDataIntoForm();

  }

  fetchDataIntoForm(): void {
    const paramIdStr = this.activatedRoute.snapshot.paramMap.get('id');
    const paramId: number | null = typeof paramIdStr === 'string' ? +paramIdStr : null;
    this.id = paramId;

    // Lấy book và đổ giá trị vào form
    const book = this.bookService.getOne(paramId);

    this.form.patchValue({
      title: book?.title,
      author: book?.author,
      description: book?.description
    })
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Book was successfully edited !")
}
  submit(): void {
    if (this.form.invalid)
      alert('Form is not valid')

    const { title, author, description } = this.form.value;


    const book: Book = {
      id: this.id || 0,
      title: title,
      author: author,
      description: description

    }
    this.showToasterSuccess();
    this.bookService.update(book);

    // Điều hướng về trang gốc
    this.router.navigateByUrl('/');
  }
}
