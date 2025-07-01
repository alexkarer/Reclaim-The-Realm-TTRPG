import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './rtr-npcgen.routes';

export const rtrNpcGenConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
