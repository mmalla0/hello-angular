import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    console.log('File upload request completed successfully.');
    return firstValueFrom(this.http.post('/api/fileupload', formData));
  }
}



