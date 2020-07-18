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
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
import { MatNativeDateModule } from '@angular/material/core';
import { ScatterTableComponent } from './scatter-table/scatter-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LineDashboardComponent } from './line-dashboard/line-dashboard.component';
import { LineChartComponent } from './line-chart/line-chart.component';

const appRoutes: Routes = [
  { path: 'scatter-dashboard', component: ScatterDashboardComponent },
  { path: 'line-dashboard', component: LineDashboardComponent },
  { path: '', redirectTo:'/scatter-dashboard', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ScatterDashboardComponent,
    ScatterChartComponent,
    ScatterConfigComponent,
    ScatterTableComponent,
    LineDashboardComponent,
    LineChartComponent
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
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule
  ],
  providers: [MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
