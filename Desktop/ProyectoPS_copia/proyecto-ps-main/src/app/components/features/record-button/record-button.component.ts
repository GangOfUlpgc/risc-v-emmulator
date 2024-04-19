import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoRecorder } from './VideoRecorder';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';
import { OptionsComponent } from '../options/options.component';
import { NextObserver } from 'rxjs';
import { CounterDown } from './CounterDown';
import { PrevisualitionContentDialogComponent } from '../previsualition-content-dialog/previsualition-content-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-record-button',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent, OptionsComponent],
	templateUrl: './record-button.component.html',
	styleUrl: './record-button.component.css',
})
export class RecordButtonComponent implements NextObserver<any> {
	@ViewChild('record_button') $recordButton: ElementRef;
	@ViewChild('micro_button') $microButton: ElementRef;

	private videoRecorder: VideoRecorder;
	private microphoneEnabled: boolean;

	protected state: string;

	@Input() _framerate: number;
	@Input() _resolution: number;
	@Input() _delay: number;

	constructor(private _matDialog: MatDialog) {
		this.state = 'RECORD';
		this.microphoneEnabled = true;
	}

	ngOnInit(): void {
		this.videoRecorder = new VideoRecorder();
		this.videoRecorder.subscribe(this);
	}

	private abrirModal(data: Blob) {
		this._matDialog.open(PrevisualitionContentDialogComponent, {
			width: '600px',
			data: { blobData: data }
		})
	}

	async toggleRecording(): Promise<void> {
		if (this.videoRecorder.isRecording()) {
			await this.videoRecorder.stop();
		} else {
			this.videoRecorder.toggleMicrophone(this.microphoneEnabled);
			await this.videoRecorder.start(this._framerate, this._resolution, this._delay);
		}
	}

	next(data: any): void {
		if (typeof data === 'number') {
			this.countDownEvents(data);
			return;
		}

		if (data instanceof MediaRecorder) {
			this.handleMediaRecorderEvents(data);
			return;
		}
	}

	private handleMediaRecorderEvents(recorder: MediaRecorder): void {
		recorder.addEventListener('start', () =>
			this.updateStateAndButtonStyle('RECORDING')
		);
		recorder.addEventListener('dataavailable', (event: BlobEvent) => {
			this.updateStateAndButtonStyle('RECORD')
			this.abrirModal(event.data);
		});
	}

	private updateStateAndButtonStyle(state: string): void {
		this.state = state;
		this.$recordButton.nativeElement.style.backgroundImage =
			state === 'RECORDING'
				? "url('/assets/recording_state.png')"
				: "url('/assets/stopped_state.png')";
		this.$microButton.nativeElement.disabled = state !== 'RECORD';
	}

	private countDownEvents(second: number) {
		this.state = second.toString();
	}

	protected toggleMicrophone() {
		this.microphoneEnabled = !this.microphoneEnabled;
		if (this.microphoneEnabled) {
			this.$microButton.nativeElement.style.backgroundImage =
				"url('/assets/micro_enable.png')";
		} else {
			this.$microButton.nativeElement.style.backgroundImage =
				"url('/assets/micro_disable.png')";
		}
	}
}
