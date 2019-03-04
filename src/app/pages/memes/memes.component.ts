import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/authentication.service';
import { FirestoreService } from 'src/app/providers/firestore.service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit {

  collection: string = "posts";
  dataLimit: number = 5;
  pointer;
  throttle = 30;
  scrollDistance = 1;

  posts: any[] = [];

  fetchPosts;
  previousGet;
  endGet = false;

  constructor(public auth: AuthenticationService, public fs:FirestoreService) { }

  ngOnInit() {
    this.getPosts();
  }


  onScrollDown () {
    console.log('scrolled down!!');
    if(!this.endGet){
      this.getMorePosts();
    }
  }

  async getPosts(){
    this.fetchPosts = await this.fs.getData(this.collection, this.dataLimit, this.pointer);
    this.pointer = this.fetchPosts.docs[this.fetchPosts.docs.length - 1];
    this.fetchPosts.docs.forEach((post)=>this.posts = [...this.posts, post._document.proto.fields]);
    // console.log("here ", this.posts);
    // console.log(this.pointer);
    // console.log("here ", this.posts[0]._document.proto.fields);
  }
  async getMorePosts(){
    this.previousGet = await this.fs.getData(this.collection, this.dataLimit, this.pointer);
      this.pointer = this.previousGet.docs[this.previousGet.docs.length - 1];
      this.previousGet.docs.forEach((post)=>this.posts = [...this.posts, post._document.proto.fields]);
      // console.log(this.posts);
  }

}
