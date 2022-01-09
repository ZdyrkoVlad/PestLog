import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {HttpLinkModule} from 'apollo-angular-link-http';
import {DefaultOptions, InMemoryCache, split} from '@apollo/client/core';
import {RouterModule, Routes} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {getOperationAST} from 'graphql';
import '@angular/compiler';

import {HttpLink} from 'apollo-angular/http';
import {WebSocketLink} from '@apollo/client/link/ws';

// component and service import
import {NavBarService} from '../app/services/navBar.service';
import {DataService} from './data.service';
import {ShareService} from './share.service';


import {AccouontAchievementsComponent} from './component/user-personal-component/accouont-achievements/accouont-achievements.component';


import {PageNotFoundComponentComponent} from './component/page-not-found-component/page-not-found-component.component';
import {AccountComponent} from './component/user-personal-component/account/account.component';
import {SiginComponent} from './component/sigin/sigin.component';
import {SigUpComponent} from './component/sig-up/sig-up.component';

import {PreviewComponent} from 'src/app/component/post-component/preview/preview.component';


import {AuthenticationBarComponent} from './component/authentication-bar/authentication-bar.component';

import {PostListComponent} from './component/post-component/post-list/post-list.component';
import {PostService} from './services/post.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import * as Sentry from '@sentry/angular';
import {LogLevel} from '@sentry/types';
import {logger} from 'codelyzer/util/logger';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {StoreModule} from '@ngrx/store';
import {PostComponent} from './component/post-component/post/post.component';

import {reducers, metaReducers} from './store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ChatComponent} from './component/chat-component/chat/chat.component';
import {EffectsModule} from '@ngrx/effects';
import {PostEffects} from 'src/app/store/effects/post';

import {AboutComponent} from './component/about/about.component';
import {ContactComponent} from './component/chat-component/contact/contact.component';
import {NewPostComponent} from './component/post-component/new-post/new-post.component';
import {RoadmapComponent} from './component/roadmap/roadmap.component';
import {CommentsComponent} from './component/comments/comments.component';
import {ChatService} from './services/chat.service';
import {PostNewDialogComponent} from './component/post-component/post-new-dialog/post-new-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

import {MarkdownModule} from 'ngx-markdown';
import {MessageService} from './services/message.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ChatDialogComponent} from './component/chat-component/chat-dialog/chat-dialog.component';
import {NewChatDialogComponent} from './component/chat-component/new-chat-dialog/new-chat-dialog.component';
import { PostEditorComponent } from './component/post-component/post-editor/post-editor.component';
import {AppRoutingModule} from './app-routing.module';

// Sentry.init({
//   dsn: 'https://7ffa92d7aec74fbea0f9ce4397c7b952@o1036466.ingest.sentry.io/6004061',
//   logLevel: LogLevel.Debug,
// });

// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    // Sentry.showReportDialog({eventId});
  }
}


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationBarComponent,

    AccountComponent,
    PreviewComponent,
    SiginComponent,
    SigUpComponent,
    AccouontAchievementsComponent,
    PostListComponent,
    PostComponent,
    ChatComponent,
    AboutComponent,
    ContactComponent,
    NewPostComponent,
    RoadmapComponent,
    CommentsComponent,
    PostNewDialogComponent,
    ChatDialogComponent,
    NewChatDialogComponent,
    PageNotFoundComponentComponent,
    PostEditorComponent,


  ],
  entryComponents: [PostNewDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpLinkModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    // ShareButtonsModule.withConfig({
    //   debug: true
    // }),
    // ShareIconsModule,
    MarkdownModule.forRoot(),
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([PostEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    BrowserAnimationsModule,
  ],
  exports: [HttpLinkModule],

  bootstrap: [AppComponent],
  providers: [{provide: ErrorHandler, useClass: SentryErrorHandler},
    {provide: MatDialogRef, useValue: {}},
    DataService, ShareService, NavBarService, PostService, ChatService, MessageService]
})
export class AppModule {

  constructor(
    apollo: Apollo,
    private httpClient: HttpClient,
    httpLink: HttpLink,
  ) {

    this.initApollo('127.0.0.1:9901', httpLink, apollo);

    const DEBUG = true;
    if (!DEBUG) {
      console.log = () => {
      };
      if (typeof (window.console) !== 'undefined') {
        window.console.log = () => {
        };
        window.console.debug = () => {
        };
        window.console.info = () => {
        };
        window.console.warn = () => {
        };
        window.console.error = () => {
        };
        // window.console.log = (message) => {
        //   Sentry.captureMessage(message || message);
        // };

      }
    }
  }


  private initApollo<T>(serverUrlConnection: string, httpLink: HttpLink, apollo: Apollo) {
    const http = httpLink.create({
      uri: 'http://' + serverUrlConnection + '/graphql'
    });
    Sentry.captureMessage('initApollo');
    const ws = new WebSocketLink({
      uri: `ws://` + serverUrlConnection + `/subscriptions`,
      options: {
        reconnect: true
      }
      ,
    });


    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      operation => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        return !!operationAST && operationAST.operation === 'subscription';
      },
      ws,
      http
    );

    const cache = new InMemoryCache();

    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    };
    apollo.create({
      link,
      cache,
      defaultOptions,
      name: 'ApolloSecond'
    });

  }
}
