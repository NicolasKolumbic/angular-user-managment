import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];

  humanizeBytes: (bytes: number) => string;
  dragOver: boolean;
  imageBase: string;

  @Output() uploadInput: EventEmitter<any>;

  constructor() {
    this.options = { concurrency: 1, maxUploads: 1, maxFileSize: 1000000 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<any>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        this.convertToBase64(this.files[0].nativeFile);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }

  private convertToBase64(file: any) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // convert image file to base64 string
      this.imageBase = reader.result.toString();
      this.uploadInput.emit(this.imageBase);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }


  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

}
