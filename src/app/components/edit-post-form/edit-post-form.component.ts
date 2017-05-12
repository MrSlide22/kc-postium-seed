import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.css']
})
export class EditPostFormComponent implements OnInit, OnDestroy {

  post: Post;
  @Output() postSubmitter: EventEmitter<Post> = new EventEmitter();

  private _postSubscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postService: PostService,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.data.forEach((data: { posts: Post }) => {
      return this.post = data.posts;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribePostEdition();
  }

  editPost(post: Post) {
    this._unsubscribePostEdition();
    this.post = post;
    this._postSubscription = this._postService.editPost(post).subscribe(() => this._router.navigate(["/posts/", this.post.id]));
  }

  private _unsubscribePostEdition(): void {
    if (this._postSubscription) {
      this._postSubscription.unsubscribe();
    }
  }
}
