import { Component } from '@angular/core';
import { AppConfig } from '../environments/environment';
import { ElectronService } from './libs/core';
import { Logger } from './libs/logging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(electronService: ElectronService, logger: Logger) {
    const log = logger.named('APP');
    log.info('AppConfig', AppConfig);

    if (electronService.isElectron) {
      log.info('Run in electron');
      log.debug('Environment is', process.env);
      log.debug('Electron ipcRenderer', electronService.ipcRenderer);
      log.debug('NodeJS childProcess', electronService.childProcess);
    } else {
      log.info('Run in browser');
    }
  }
}
