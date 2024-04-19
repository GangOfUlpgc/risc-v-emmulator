import { Component, Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';


@Component({
	selector: 'app-options',
	standalone: true,
	imports: [FormsModule, ScreenshotButtonComponent],
	templateUrl: './options.component.html',
	styleUrl: './options.component.css',
})
export class OptionsComponent {
	framerate: number;
	resolution: number;
	delay: number;

	@Output() framerate_event: EventEmitter<number> =new EventEmitter<number>();
	@Output() resolution_event: EventEmitter<number> = new EventEmitter<number>();
	@Output() delay_event: EventEmitter<number> = new EventEmitter<number>();


	onFramerateChange() {
		this.framerate_event.emit(this.framerate);
	}
	onResolutionChange() {
		this.resolution_event.emit(this.resolution);
	}
	onDelayChange() {
		this.delay_event.emit(this.delay);
	}

	constructor() {
		this.framerate = 60;
		this.resolution = 1080;
		this.delay = 0;
	}
}
