import { NgModule } from '@angular/core';
import { AdminGuard } from '@guards/admin.guard';
import { AuthGuard } from '@guards/auth.guard';
import { StudentGuard} from '@guards/student.guard';
import { CompanyGuard} from '@guards/company.guard';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [AdminGuard,AuthGuard,StudentGuard,CompanyGuard],
})
export class GuardModule { }
