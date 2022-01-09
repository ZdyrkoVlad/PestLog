import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SiginComponent} from './component/sigin/sigin.component';
import {SigUpComponent} from './component/sig-up/sig-up.component';
import {AccountComponent} from './component/user-personal-component/account/account.component';
import {AboutComponent} from './component/about/about.component';
import {ContactComponent} from './component/chat-component/contact/contact.component';
import {RoadmapComponent} from './component/roadmap/roadmap.component';
import {AppComponent} from './app.component';
import {AccouontAchievementsComponent} from './component/user-personal-component/accouont-achievements/accouont-achievements.component';
import {PostListComponent} from './component/post-component/post-list/post-list.component';
import {NewPostComponent} from './component/post-component/new-post/new-post.component';
import {ChatComponent} from './component/chat-component/chat/chat.component';
import {PostComponent} from './component/post-component/post/post.component';
import {PageNotFoundComponentComponent} from './component/page-not-found-component/page-not-found-component.component';
import {PostEditorComponent} from './component/post-component/post-editor/post-editor.component';
import {AuthGuard} from './guard/auth.guard';

const appRoutes: Routes = [
  {path: 'sigin', component: SiginComponent},
  {path: 'singup', component: SigUpComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: 'testService', component: AppComponent},
  {path: 'accountAchi', component: AccouontAchievementsComponent},
  {path: 'postList', component: PostListComponent},
  {path: 'newPost', component: NewPostComponent},
  {path: 'postEditor/:id', component: PostEditorComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'post/:id', component: PostComponent},
  {path: '**', component: PageNotFoundComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
