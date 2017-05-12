import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from "../../models/post";
import { Category } from '../../models/category';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs/Subscription';
import { LikeService } from '../../services/like.service';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;
    user: User;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _postService: PostService,
        private _likeService: LikeService,
        private _userService: UserService
    ) { }

    ngOnInit(): void {

        this._activatedRoute.data.forEach(
            // (data: { post: Post, user: User }) => {
            //     this.post = data.post;
            //     this.user = data.user;
            // }
            (data: any) => {
                console.log(data);
            }
        );
        window.scrollTo(0, 0);
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

        this._likeService.like(this.post.id).subscribe(likes => this.post.likes = likes);
    }

    doILike() {
        return this._likeService.doILike(this.post.id);
    }
}
