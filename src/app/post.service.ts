import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Post} from './post';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class PostService {

    result: any;

    constructor(private _http: Http) {
    }

    getPosts() {
        return this._http.get('/api/posts')
            .pipe(
                map(result => {
                    console.log(JSON.parse(result['_body']));
                    this.result = result.json();
                    return this.result;
                })
            );
    }

    getPost(id) {
        return this._http.get('/api/details/' + id)
            .pipe(
                map(result => this.result = result.json())
            );

    }

    insertPost(post: Post) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this._http.post('/api/posts', JSON.stringify(post), options)
            .pipe(
                map(result => this.result = result.json())
            );
    }


}
