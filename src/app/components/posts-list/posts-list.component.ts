import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

import { Post } from "../../models/post";


@Component({
    selector: "posts-list",
    templateUrl: "posts-list.component.html"
})
export class PostsListComponent {

    @Input() posts: Post[];

    constructor(private _router: Router) { }

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                                 |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------------------------------------|
     | ~~~ [Green Path | HECHO] ~~~                                                                                    |
     |-----------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección de un post y navega a la dirección |
     | correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app.  La ruta |
     | a navegar es '/posts', pasando como parámetro el identificador del post.                                        |
     |-----------------------------------------------------------------------------------------------------------------*/
    goToPost(post) {
        this._router.navigate(['/posts', post.id]);
    }
}
