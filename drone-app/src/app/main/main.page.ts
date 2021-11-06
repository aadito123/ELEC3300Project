import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
} from '@ionic-native/camera-preview/ngx';
import { create } from 'nipplejs';

@Component({
  selector: 'main-tabs',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})
export class MainPage {
  picturePath: string;
  constructor(private camera: CameraPreview, private router: Router) {}

  ngOnInit() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0.9 * window.screen.width,
      y: 0.9 * window.screen.height,
      width: 0.9 * window.screen.width,
      height: 0.9 * window.screen.height,
      camera: 'rear',
      tapPhoto: false,
      previewDrag: false,
      storeToFile: true, // add storeToFile?: boolean; to the CameraPreviewOptions definition
      toBack: true,
      alpha: 1,
    };
    this.camera.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    this.camera.show().then(
      () => {
        console.log('cam success');
      },
      () => {
        console.log('cam fail');
      }
    );
  }

  takePictureAndRoute() {
    console.log('takePic called');
    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 100,
    };
    this.camera.takePicture(pictureOpts).then((imageData) => {
      console.log('Clicked pic!', imageData[0]);
      this.picturePath = imageData[0];
      console.log('picturePath: ', this.picturePath);

      // photo taken from phone -> google cloud function (vision API -> hydrolabs API) -> back to us

      /* TODO: make this shit work
      const fb = new FormData();
      fb.append(
        'image',
        JSON.stringify({
          name: 'image',
          type: 'image/jpeg',
          uri: this.picturePath,
        })
      );
      fb.append('bodyweight', '180');
      fb.append('duration', '100');
      fb.append('id', '0');
      fetch('https://api.hydrolabs.com/api/process', {
        method: 'POST',
        body: fb,
        headers: { 'Content-Type': 'application/json' },
      }).then(
        (response) => {
          console.log('Response: ', response);
          console.log('Response JSON: ', response.json());
        },
        (error) => {
          console.log('Error: ', error);
        }
      );*/

      this.router.navigate(['result-hydrolabs']);
    });
  }

  ionViewWillLeave() {
    this.camera.stopCamera();
  }

  ionViewDidLoad() {
    // Now we know the DOM is ready
    let options = {
      zone: document.getElementById('zone_joystick'),
    };

    let manager = create(options);
    manager.on('move', function (evt, nipple) {
      console.log('moved', nipple);
      // nipple.on('move', function (evt, data) {
      //   if (data.angle) {
      //     if (Math.abs(data.force) <= 1) {
      //       // px, py are between 0 and 1
      //       let px = +Math.sin(data.angle.radian) * data.force;
      //       let py = -Math.cos(data.angle.radian) * data.force;

      //       console.log('px: ' + px);
      //       console.log('py: ' + py);
      //     }
      //   }
      // });
    });
    //   .on('removed', function (evt, nipple) {
    //     console.log('removed');
    //     nipple.off('move');
    //   });
  }
}
