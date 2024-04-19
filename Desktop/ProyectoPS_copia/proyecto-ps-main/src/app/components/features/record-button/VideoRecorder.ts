import { NextObserver, Subscribable, Unsubscribable } from 'rxjs';
import { MediaCombiner } from './MediaCombiner';

export class VideoRecorder implements Subscribable<any>, Unsubscribable {
	private media: MediaStream;
	private mediaRecorder: MediaRecorder;
	private observers: NextObserver<any>[];
	private micro: boolean;

	constructor() {
		this.observers = [];
		this.micro = true;
	}

	public async start(
		framerate: number,
		resolution: number,
		delay: number
	): Promise<void> {
		const audioStream = this.micro
			? await navigator.mediaDevices.getUserMedia({ audio: true })
			: null;
		const videoStream = await this.getDisplayMedia(framerate, resolution);
		const media = audioStream
			? new MediaCombiner([audioStream, videoStream]).combine()
			: videoStream;

		this.mediaRecorder = this.generateMediaRecorder(media);

		setTimeout(() => {
			this.notifyObserver(this.mediaRecorder);
			this.mediaRecorder.start();
			this.generateVideoTrack(media);
		}, delay);
	}

	private async getDisplayMedia(
		frameRate: number,
		height: number
	): Promise<MediaStream> {
		return navigator.mediaDevices.getDisplayMedia({
			video: { frameRate: { ideal: frameRate, max: 60 }, height },
			audio: true,
		});
	}

	private generateMediaRecorder(stream: MediaStream): MediaRecorder {
		const recorder = new MediaRecorder(stream, {
			mimeType: 'video/x-matroska',
		});

		return recorder;
	}



	private generateVideoTrack(media: MediaStream): MediaStreamTrack {
		const videoTrack = media.getVideoTracks()[0];
		videoTrack.onended = () => this.stop();
		return videoTrack;
	}

	async stop(): Promise<void> {
		this.mediaRecorder.stop();
		this.mediaRecorder = null;
	}

	isRecording(): boolean {
		if (this.mediaRecorder == null) return false;
		return true;
	}

	toggleMicrophone(enabled: boolean): void {
		this.micro = enabled;
	}

	subscribe(observer: NextObserver<any>): Unsubscribable {
		this.observers.push(observer);
		return this;
	}

	private notifyObserver(data: any): void {
		this.observers.forEach((observer) => observer.next(data));
	}

	unsubscribe(): void {
		this.observers = [];
	}
}
