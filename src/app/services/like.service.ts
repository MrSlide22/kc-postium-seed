import { Injectable } from '@angular/core';

@Injectable()
export class LikeService {

    data = { likes: [] };

    /**
     * @param {number} postId the id of the post to like
     * @return {number} 1 if like is stored. 0 if like is already given
     */
    like(postId: number) {

        this.data.likes = this._getLikes();

        // add like
        if (this.data.likes.indexOf(postId) === -1) {

            this.data.likes.push(postId);
            localStorage.setItem('likes', JSON.stringify(this.data.likes));

            return 1;

        } else { // remove like
            const index = this.data.likes.indexOf(postId);
            this.data.likes.splice(index, 1);

            localStorage.setItem('likes', JSON.stringify(this.data.likes));

            return -1;
        }
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
}