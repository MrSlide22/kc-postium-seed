import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

import { Post } from "../../models/post";
import { User } from '../../models/user';


@Component({
    selector: "posts-list",
    templateUrl: "posts-list.component.html"
})
export class PostsListComponent {

    @Input() posts: Post[];

    constructor(private _router: Router) { }

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ [Red Path | HECHO] ~~~                                                                                       |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/
     goToAuthor(user: User){
         this._router.navigate(['/posts/users', user.id]);
     }

    /*-----------------------------------------------------------------------------------------------------------------|
     | ~~~ [Green Path | HECHO] ~~~                                                                                    |
     |-----------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección de un post y navega a la dirección |
     | correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app.  La ruta |
     | a navegar es '/posts', pasando como parámetro el identificador del post.                                        |
     |-----------------------------------------------------------------------------------------------------------------*/
    goToPost(post: Post) {
        this._router.navigate(['/posts', post.id]);
    }
}
