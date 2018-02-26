import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { URL_ADMIN } from "@app/admin/service/variables";
import { JwtHelper } from "angular2-jwt";
@Injectable()
export class UploadFileService {
    constructor(private http: Http) { }
    credentialHeaderForUpfile(): Headers {
        var headers = new Headers();
        if (typeof window != "undefined") {
            var jwt = new JwtHelper();
            var token = localStorage.getItem("token_hure");
            if (token) {
                headers.append("Authorization", "Bearer " + token);
            }
        }
        return headers;
    }
    uploadFile(file: any): Promise<string> {
        return this.http.post(URL_ADMIN.UPLOAD_FILE, file,
            { headers: this.credentialHeaderForUpfile() })
            .toPromise()
            .then(url => {
                return url.json();
            });
    }
}