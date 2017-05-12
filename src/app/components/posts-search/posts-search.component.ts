import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.css']
})
export class PostsSearchComponent implements OnInit {

  posts: Post[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postService: PostService
  ) { }

  ngOnInit(): void {

    // Obtener posts al llegar a la pagina
    this._activatedRoute.data.forEach((data: { post: Post[] }) => {

      return this.posts = data.post;
    });

    // observar parametros para detectar cambios
    this._listenParams();
    window.scrollTo(0, 0);
  }

  private _listenParams() {

    this._activatedRoute.queryParams.subscribe(
      params => {

        this._postService.searchPosts(params.q).map(
          (posts: Post[]) => {

            this.posts = posts;
          }).subscribe();
      });
  }
}
