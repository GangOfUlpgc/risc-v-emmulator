import { throwError } from "rxjs";

export class HTTPVideo {
    private constructor() { }

    static sendVideo(videoName: string, file: Blob) {

        const formData = new FormData();
        formData.append('name', videoName);
        formData.append('video', file);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
            .then(async (response) => {
                console.log("video recibido");
                this.downloadVideo(await response.arrayBuffer())
            })
            .catch(error => {
                const link: HTMLAnchorElement = document.createElement('a');
                link.href = URL.createObjectURL(file);
                link.download = 'video.mkv';
                link.click()
            });

    }

    private static async downloadVideo(data: ArrayBuffer): Promise<void> {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));
        link.download = 'video.mp4';
        link.click();
    }

}