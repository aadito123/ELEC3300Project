import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CameraPreview,
  CameraPreviewOptions,
} from '@ionic-native/camera-preview/ngx';
import * as nipplejs from 'nipplejs';
@Component({
  selector: 'main-tabs',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})
export class MainPage {
  picturePath: string;
  isToBack = true;
  constructor(private camera: CameraPreview, private router: Router) {}

  ngOnInit() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: false,
      previewDrag: false,
      storeToFile: true, // add storeToFile?: boolean; to the CameraPreviewOptions definition
      toBack: this.isToBack,
      alpha: 1,
    };
    this.camera
      .startCamera(cameraPreviewOpts)
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
      .then(() => {
        this.camera.show().then(
          () => {
            console.log('cam success');
          },
          () => {
            console.log('cam fail');
          }
        );
      });
  }

  ngAfterViewInit() {
    var manager1 = nipplejs.create({
      zone: document.getElementById('zone_joystick1'),
      size: 100,
      color: 'transparent',
    });
    var manager2 = nipplejs.create({
      zone: document.getElementById('zone_joystick2'),
      size: 100,
      color: 'transparent',
    });

    manager1.on('added', function (evt, nipple) {
      // change handler function type to (evt: EventData, data: any) => void
      nipple.on('move', function (evt, data) {
        console.log('Data1: ', data); // data.position.x, data.position.y range from 0 to 150
      });
    });
    manager2.on('added', function (evt, nipple) {
      // change handler function type to (evt: EventData, data: any) => void
      nipple.on('move', function (evt, data) {
        console.log('Data2: ', data); // data.position.x, data.position.y range from 0 to 150
      });
    });
  }

  ionViewWillLeave() {
    this.camera.stopCamera();
  }
}
