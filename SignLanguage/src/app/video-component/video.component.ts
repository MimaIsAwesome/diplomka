import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() toggle;
    @ViewChild('video') video: any;
    translation: string;

    ngOnInit() {
        this.translation = '\"Nothing to translate\"';
    }

    ngAfterViewInit() {
        const video = <HTMLVideoElement> document.querySelector('#videoElement');


        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(function(stream) {
                    video.srcObject = stream;
                })
                .catch(function(err0r) {
                    console.log('Something went wrong!');
                });
        }

        if (!this.toggle) {
            console.log('here');
            const stream = video.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach(function(track) {
                track.stop();
            });

            video.srcObject = null;
        }

    }

    ngOnDestroy(): void {
        const video = <HTMLVideoElement> document.querySelector('#videoElement');

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then(function(stream) {
                    console.log('here');
                    const tracks = stream.getTracks();

                    tracks.forEach(function(track) {
                        track.stop();
                    });

                    video.srcObject = null;
                })
                .catch(function(err0r) {
                    console.log('Something went wrong!');
                });
        }
    }
}
