/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { rtrNpcGenConfig } from './app/rtr-npcgen.config';
import { RtRNpcGenComponent } from './app/rtr-npcgen.component';

bootstrapApplication(RtRNpcGenComponent, rtrNpcGenConfig)
  .catch((err) => console.error(err));
