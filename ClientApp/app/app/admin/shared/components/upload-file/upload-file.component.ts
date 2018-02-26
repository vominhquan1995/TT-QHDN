import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UploadFileService } from '@app/admin/service/front-end/upload-file.service';
import { Variables } from '@app/admin/shared/variables';
@Component({
    selector: 'admin-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class AdminUploadFileComponent implements OnInit {
    @Output() uploadSuccess: EventEmitter<any> = new EventEmitter();
    @Input() url: string;
    constructor(
        private servcie: UploadFileService
    ) { }
    ngOnInit() {
        if (!this.url) {
            this.url = Variables.URL_IMAGE_DEFAULT;
        }
        this.uploadSuccess.emit(this.url);
    }
    uploadFile(event: any) {
        let files = event.target.files;
        if (files.length > 0) {
            let formData: FormData = new FormData();
            for (let file of files) {
                formData.append('files', file, file.name);
            }
            this.servcie.uploadFile(formData).then(url => {
                this.url = url;
                this.uploadSuccess.emit(url);
            })
        }
    }
}
