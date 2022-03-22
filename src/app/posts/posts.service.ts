import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model"
import { Router } from "@angular/router";

@Injectable(
  {
    providedIn: 'root'
  })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .pipe()
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(_id: string) {
    return this.http.get<{_id: string; title: string; content: string}>("http://localhost:3000/api/posts/" + _id);
  }

  addPost(post: Post) {
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts/', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post._id = id;
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post._id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { _id: id, title: title, content: content };
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p._id === post._id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

 
}
