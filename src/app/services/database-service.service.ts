import { Injectable } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private database: Database) { }

  getItems(tabla: string): Observable<any[]> {
    return new Observable((observer) => {
      const dbRef = ref(this.database, tabla);
     
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const items: any[] = [];
       
        if (data) {
          Object.keys(data).forEach(key => {
            items.push({ id: key, ...data[key] });
          });
        }
       
        observer.next(items);
      }, (error) => {
        observer.error(error);
      });
    });
  }

}
