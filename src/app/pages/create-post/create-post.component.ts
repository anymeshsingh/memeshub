import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/providers/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  title: string = '';
  isHovering: boolean;
  fileAccepted: boolean = false;
  file: File;
  fileType: string;
  fiveMB: number = 5242880;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private auth: AuthenticationService,
    private router:Router
    ) {

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    if(files.item(0).size <= this.fiveMB){
      this.file = files.item(0);
      this.fileType = this.file.type.split('/')[0];
      // console.log(this.fileType);
    }
  }

  startUpload() {

    const fileName = this.generateUniqueFilename(this.file.name);
    // The storage path
    const path = `posts/${fileName}`;

    const { uid, displayName, username, email, photoUrl } = this.auth.staticUser;

    // console.log(this.auth.staticUser.__zone_symbol__value);
    const post = {
      uid,
      displayName,
      username,
      email,
      fileName,
      photoUrl,
      title: this.title,
      imageUrl: '',
      videoUrl: ''
    }
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    // let snapshotChanges = this.task.snapshotChanges().subscribe()

    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        let finalPost = { 
          ...post,
          imageUrl: (this.fileType === 'image') ? this.downloadURL : '',
          videoUrl: (this.fileType === 'video') ? this.downloadURL : '',
          postedOnDate: Date.now(),
          path 
        }
        this.db.collection('posts').add(finalPost)
        .then(res=>{
          this.router.navigate(['/memes']);
        })
        .catch(err=>console.log(err));
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  generateUniqueFilename(filename):string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return `${Date.now()}_${text}_${filename}`;
  }

}
