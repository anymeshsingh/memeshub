import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  getData(collection, limit, pointer){
    if(!pointer){
      return this.afs.collection(`${collection}`, ref => ref.orderBy(`postedOnDate`, `desc`).limit(limit)).get().toPromise() //.then(res=>res.docs)
    } else {
      return this.afs.collection(`${collection}`, ref => ref.orderBy(`postedOnDate`, `desc`).startAfter(pointer).limit(limit)).get().toPromise()
    }
  }

}
