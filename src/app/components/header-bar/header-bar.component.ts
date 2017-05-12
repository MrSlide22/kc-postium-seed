import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: "header-bar",
    templateUrl: "header-bar.component.html",
    styleUrls: ["header-bar.component.css"]
})
export class HeaderBarComponent {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
    }


    search(busqueda: string) {

        this._router.navigate(['search-posts'], { queryParams: { q: busqueda } });
    }
}
