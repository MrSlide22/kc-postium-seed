import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from "../../models/post";
import { Category } from '../../models/category';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs/Subscription';
import { LikeService } from '../../services/like.service';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit, OnDestroy {

    post: Post;
    private _postSubscription: Subscription;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _postService: PostService,
        private _likeService: LikeService
    ) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post }) => this.post = data.post);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this._unsubscribePostLike();
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*---------------------------------------------------------------------------------------------------------------|
     | ~~~ [Red Path | HECHO] ~~~                                                                                    |
     |---------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
     | pasando como parámetro el identificador del autor.                                                            |
     |---------------------------------------------------------------------------------------------------------------*/
    goToAuthor(user: User) {
        this._router.navigate(['/posts/users', user.id]);
    }

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ [Yellow Path | HECHO] ~~~                                                                                      |
     |--------------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
     | pasando como parámetro el identificador de la categoría.                                                           |
     |--------------------------------------------------------------------------------------------------------------------*/
    goToCategoria(categoria: Category) {
        this._router.navigate(['/posts/categories', categoria.id]);
    }

    goToEditPost() {
        this._router.navigate(['/edit-story', this.post.id]);
    }

    likePost() {

        this._postSubscription = this._postService.getPostDetails(this.post.id).map((post: Post) => {

            this.post = post;

            this.post.likes += this._likeService.like(this.post.id);

            this._unsubscribePostLike();
            this._postSubscription = this._postService.editPost(this.post).subscribe();

        }).subscribe();
    }

    doILike() {
        return this._likeService.doILike(this.post.id);
    }

    private _unsubscribePostLike(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }
}
