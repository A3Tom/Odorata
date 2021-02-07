import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import * as PostActions from '../actions/post.actions';
import { Post } from '../models/post.model';
export type Action = PostActions.All;

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private db: AngularFirestoreCollection) {}

    @Effect()
    getPost$: Observable<Action> = this.actions$
        .pipe(
            ofType<Action>(PostActions.GET_POST),
            mergeMap(
                () => this.db.valueChanges({ idField: 'id' })
                    .pipe(
                        map((post: any) => new PostActions.GetPost(post))
            ),
        ),
    );
}