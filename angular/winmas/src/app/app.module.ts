import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { Routes, RouterModule } from '@angular/router'

import { ChartsModule } from 'ng2-charts';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { ScatterDashboardComponent } from './scatter-dashboard/scatter-dashboard.component';
import { ScatterConfigComponent } from './scatter-config/scatter-config.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScatterTableComponent } from './scatter-table/scatter-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const appRoutes: Routes = [
  { path: 'scatter-dashboard', component: ScatterDashboardComponent },
  { path: '', redirectTo:'/scatter-dashboard', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ScatterDashboardComponent,
    ScatterChartComponent,
    ScatterConfigComponent,
    ScatterTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
