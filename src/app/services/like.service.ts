import { Injectable, OnDestroy } from '@angular/core';
import { PostService } from './post.service';
import { Post } from '../models/post';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LikeService implements OnDestroy {

    data = { likes: [] };
    private _postSubscription: Subscription;

    constructor(
        private _postService: PostService
    ) { }

    ngOnDestroy(): void {
        this._unsubscribePostLike();
    }

    /**
     * @param {number} postId the id of the post to like
     * @return {Observable<number>} observable with the numbers of like the post has
     */
    like(postId: number): Observable<number> {

        return this._postService.getPostDetails(postId).map((post: Post) => {

            this.data.likes = this._getLikes();

            // add like to localStorage
            if (this.data.likes.indexOf(postId) === -1) {

                post.likes++;

                this.data.likes.push(postId);
                localStorage.setItem('likes', JSON.stringify(this.data.likes));

            } else { // remove like from localStorage

                post.likes--;

                const index = this.data.likes.indexOf(postId);
                this.data.likes.splice(index, 1);

                localStorage.setItem('likes', JSON.stringify(this.data.likes));
            }

            this._unsubscribePostLike();
            this._postSubscription = this._postService.editPost(post).subscribe();

            return post.likes;
        });
    }

    /**
     * @param {number} postId the id of the post to like
     * @return {boolean} if postId is in likes array
     */
    doILike(postId: number) {
        this.data.likes = this._getLikes();
        return this.data.likes.indexOf(postId) !== -1;
    }

    /**
     * @return {Array} returns the likes array
     */
    private _getLikes() {
        return JSON.parse(localStorage.getItem('likes')) || [];
    }

    private _unsubscribePostLike(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }
}