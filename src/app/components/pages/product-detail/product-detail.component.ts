import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: any;
  currentProduct: any;
  reviewsForm!: FormGroup;
  constructor(private service: ProductService,private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.reviewsForm = new FormGroup({
      star: new FormControl(),
      comment: new FormControl(),
    })

    this.activatedRoute.params.subscribe(params=>{
      this.id = params['id']
    });

    this.service.getProductById(this.id).subscribe((res)=>{
      this.currentProduct = res.data;
    });
  }

  btnReviews(idReview: any){
    let review = {
      star: this.reviewsForm.value.star,
      comment: this.reviewsForm.value.comment
    }
    // alert(review.star + review.comment + idReview)
    this.service.reviewProduct(idReview, review).subscribe((res)=>{
      this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(()=> this.router.navigate(['/product/detail/'+idReview]));
    })
  }

  createRange(star){
    if(star==null){
      star=0
    }else if(star>5){
      star=5
    }
    let a = new Array(star);
    return a;
  }

  createRange2(star){
    if(star==null){
      star=0
    }else if(star>5){
      star=5
    }
    star = 5-star;
    let a = new Array(star);
    return a;
  }
}
