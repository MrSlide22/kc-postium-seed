import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { Post } from "../../models/post";
import { User } from "../../models/user";

@Component({
    selector: "post-form",
    templateUrl: "post-form.component.html",
    styleUrls: ["post-form.component.css"]
})
export class PostFormComponent implements OnInit {

    nowDatetimeLocal: string;
    publicationDateScheduled: boolean = false;
    buttonText: string;

    @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

    // Vincular un posible post existente al formulario
    @Input() post: Post = <Post>{};

    ngOnInit(): void {

        // asignar el texto del boton en funcion de si existe el post o se crea uno nuevo
        this.buttonText = this.post.title ? 'Editar' : 'Publicar';

        // asignar publicationDateScheduled en funcion de si this.post tiene fecha o no
        this.publicationDateScheduled = this.post.publicationDate ? true : false;

        // asignar nowDatetimeLocal en funcion de si this.post tiene fecha o no
        this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date(this.post.publicationDate));
    }

    private _formatDateToDatetimeLocal(date: Date) {
        return `
            ${this._fixPad(date.getFullYear(), 4)}-
            ${this._fixPad(date.getMonth() + 1, 2)}-
            ${this._fixPad(date.getDate(), 2)}T
            ${this._fixPad(date.getHours(), 2)}:
            ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, "").replace(/ /gi, "");
    }

    private _fixPad(datePart: number, length: number): string {
        return `0000${datePart}`.slice(-length);
    }

    private _getPostPublicationDate(formPublicationDate: string): number {
        let publicationDate: Date;
        if (this.publicationDateScheduled) {
            publicationDate = new Date(formPublicationDate);
            if (isNaN(publicationDate.getTime())) {
                publicationDate = new Date();
            }
        }
        else {
            publicationDate = new Date();
        }
        return publicationDate.getTime();
    }

    setScheduling(schedule: boolean): void {
        this.publicationDateScheduled = schedule;
    }

    submitPost(form: FormGroup): void {

        /*-------------------------------------------------------------------------------------------------------------|
         | ~~~ [Purple Path | HECHO] ~~~                                                                               |
         |-------------------------------------------------------------------------------------------------------------|
         | Aquí no tienes que hacer nada más allá de comprobar que los datos del formulario se recogen correctamente y |
         | tienen 'forma' de Post. Si no es así, al hacer 'Post.fromJson()' se instanciará un post que no se parece en |
         | nada a lo indicado en el formulario. Por tanto, pon especial atención a que los nombres indicados en los    |
         | distintos elementos del formulario se correspondan con las propiedades de la clase Post.                    |
         |-------------------------------------------------------------------------------------------------------------*/

        const valores = form.value;

        // Comprobar que lleva todos los campos necesarios
        // y si no es asi, los incluyo en el objeto
        valores.id = this.post.id ? this.post.id : null;
        valores.title = valores.title ? valores.title : '';
        valores.intro = valores.intro ? valores.intro : '';
        valores.body = valores.body ? valores.body : '';
        valores.media = valores.media ? valores.media : '';
        valores.categories = valores.categories ? valores.categories : [];

        let post: Post = Post.fromJson(valores);
        post.author = User.defaultUser();
        post.publicationDate = this._getPostPublicationDate(form.value.publicationDate);
        post.likes = 0;
        this.postSubmitted.emit(post);
    }
}
