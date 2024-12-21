import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ThanksComponent } from './contact/thanks/thanks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'userAdmin', component: UserAdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'thanks', component: ThanksComponent },
];
