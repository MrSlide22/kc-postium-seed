import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CategoryPostsComponent } from "./components/category-posts/category-posts.component";
import { NewsComponent } from "./components/news/news.component";
import { NewStoryComponent } from "./components/new-story/new-story.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { UserPostsComponent } from "./components/user-posts/user-posts.component";
import { PostDetailsResolve } from "./services/post-details-resolve.service";
import { PostsResolve } from "./services/posts-resolve.service";
import { EditPostFormComponent } from './components/edit-post-form/edit-post-form.component';
import { PostsSearchResolve } from './services/posts-search-resolve.service';
import { PostsSearchComponent } from './components/posts-search/posts-search.component';
import { UsersResolve } from './services/users-resolver.service';

const routes: Routes = [
    {
        path: "posts",
        component: NewsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "posts/users/:userId",
        component: UserPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "posts/categories/:categoryId",
        component: CategoryPostsComponent,
        resolve: {
            posts: PostsResolve
        }
    },
    {
        path: "new-story",
        component: NewStoryComponent
    },
    {
        path: "edit-story/:postId",
        component: EditPostFormComponent,
        resolve: {
            posts: PostDetailsResolve
        }
    },
    {
        path: "posts/:postId",
        component: PostDetailsComponent,
        resolve: {
            post: PostDetailsResolve,
            user: UsersResolve
        }
    },
    {
        path: "posts/:postId",
        component: PostDetailsComponent,
        resolve: {
            post: PostDetailsResolve
        }
    },
    {
        path: "search-posts",
        component: PostsSearchComponent,
        resolve: {
            post: PostsSearchResolve
        }
    },
    {
        path: "**",
        redirectTo: "/posts"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
