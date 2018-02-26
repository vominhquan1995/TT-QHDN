import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { searchRouter } from '@app/end-user/search/search.router';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  imports: [
    CommonModule, searchRouter, SharedModule, CoreModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }