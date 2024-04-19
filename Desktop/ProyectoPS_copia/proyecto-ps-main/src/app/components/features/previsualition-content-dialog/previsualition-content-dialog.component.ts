import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HTTPVideo } from "../record-button/HTTPVideo";

@Component({
  selector: 'app-previsualition-content-dialog',
  standalone: true,
  imports: [],
  templateUrl: './previsualition-content-dialog.component.html',
  styleUrl: './previsualition-content-dialog.component.css'
})
export class PrevisualitionContentDialogComponent {
  VideoUrl : string
  blob: Blob
  constructor(public _matDialogRef: MatDialogRef<PrevisualitionContentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.blob = data.blobData
    this.VideoUrl = URL.createObjectURL(data.blobData);
    
  }
  async downloadVideo(data: Blob): Promise<void> {
    HTTPVideo.sendVideo('video.mkv', data)
  }
}
