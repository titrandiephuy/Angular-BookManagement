import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  id: any ;
  bookDetails: any;
  constructor(
    private router: Router,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {
    const paramIdStr = this.activatedRoute.snapshot.paramMap.get('id');
    const paramId: number | null = typeof paramIdStr === 'string' ? +paramIdStr : null;
    this.id = paramId;
    this.bookDetails =  this.bookService.getOne(paramId)
  }
  showToasterError(){
    this.notifyService.showError("Book was deleted sucessfully!")
}
  submitDelete(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.delete(id || '');
    this.showToasterError();
    this.goBack();
  }

  goBack(): void {
    this.router.navigateByUrl('/')
  }
}
