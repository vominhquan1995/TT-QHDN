import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmService } from './frontend/confirm.service';
import { AlertService } from './frontend/alert.service';
import { ProgressService } from './frontend/progress.service';
import { LoadingService } from './frontend/loading.service';
import { CommonHttpService } from './backend/common-http.service';
import { AuthService } from "@services/backend/auth.service";
import { CoreModule } from '@core/core.module';
import { JobService } from '@services/backend/job.service';
import { HttpModule } from '@angular/http';
import { ProfileService } from '@services/backend/profile.service';
import { LocalService } from '@services/backend/local.service';
import { EventService } from "@services/backend/event.service";
import { JobGroupService } from '@services/backend/job-group.service';
import { RoleService } from '@services/backend/role.service';
import { WorkTypeService } from '@services/backend/work-type.service';
import { CompanyService } from '@services/backend/company.service';
import { DataService } from '@services/frontend/data.service';
import { ApplyService } from '@services/backend/apply.service';
import { SlideService } from '@services/backend/slide.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpModule],
    exports: [],
    providers: [ConfirmService, AlertService, ProgressService, LoadingService, CommonHttpService, AuthService, DataService,
        JobService, ProfileService, LocalService, EventService, JobGroupService, RoleService, WorkTypeService, CompanyService,
        ApplyService,SlideService],
})
export class ServiceModule { }