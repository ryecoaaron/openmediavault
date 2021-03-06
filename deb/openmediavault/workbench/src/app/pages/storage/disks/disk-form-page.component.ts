import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { FormPageConfig } from '~/app/core/components/limn-ui/models/form-page-config.type';

@Component({
  template: '<omv-limn-form-page [config]="this.config"></omv-limn-form-page>'
})
export class DiskFormPageComponent {
  public config: FormPageConfig = {
    request: {
      service: 'DiskMgmt',
      get: {
        method: 'getHdParm',
        params: {
          uuid: '{{ _routeParams.uuid }}'
        }
      },
      post: {
        method: 'setHdParm'
      }
    },
    fields: [
      {
        type: 'confObjUuid'
      },
      {
        type: 'select',
        name: 'devicefile',
        label: gettext('Device'),
        valueField: 'devicefile',
        textField: 'description',
        disabled: true,
        value: '{{ _routeParams.devicefile }}',
        store: {
          proxy: {
            service: 'DiskMgmt',
            get: {
              method: 'enumerateDevices'
            }
          }
        }
      },
      {
        type: 'select',
        name: 'apm',
        label: gettext('Advanced Power Management'),
        value: 0,
        store: {
          data: [
            {
              text: gettext('Disabled'),
              value: 0
            },
            {
              text: gettext('1 - Minimum power usage with standby (spindown)'),
              value: 1
            },
            {
              text: gettext('64 - Intermediate power usage with standby'),
              value: 64
            },
            {
              text: gettext('127 - Intermediate power usage with standby'),
              value: 127
            },
            {
              text: gettext('128 - Minimum power usage without standby (no spindown)'),
              value: 128
            },
            {
              text: gettext('192 - Intermediate power usage without standby'),
              value: 192
            },
            {
              text: gettext('254 - Maximum performance, maximum power usage'),
              value: 254
            },
            {
              text: gettext('255 - Disabled'),
              value: 255
            }
          ]
        }
      },
      {
        type: 'select',
        name: 'aam',
        label: gettext('Advanced Acoustic Management'),
        value: 0,
        store: {
          data: [
            {
              text: gettext('Disabled'),
              value: 0
            },
            {
              text: gettext('Minimum performance, minimum acoustic output'),
              value: 128
            },
            {
              text: gettext('Maximum performance, maximum acoustic output'),
              value: 254
            }
          ]
        }
      },
      {
        type: 'select',
        name: 'spindowntime',
        label: gettext('Spindown time'),
        value: 0,
        store: {
          data: [
            {
              text: gettext('Disabled'),
              value: 0
            },
            {
              text: gettext('5 minutes'),
              value: 60
            },
            {
              text: gettext('10 minutes'),
              value: 120
            },
            {
              text: gettext('20 minutes'),
              value: 240
            },
            {
              text: gettext('30 minutes'),
              value: 241
            },
            {
              text: gettext('60 minutes'),
              value: 242
            },
            {
              text: gettext('120 minutes'),
              value: 244
            },
            {
              text: gettext('180 minutes'),
              value: 246
            },
            {
              text: gettext('240 minutes'),
              value: 248
            },
            {
              text: gettext('300 minutes'),
              value: 250
            },
            {
              text: gettext('330 minutes'),
              value: 251
            }
          ]
        }
      },
      {
        type: 'checkbox',
        name: 'writecache',
        label: gettext('Enable write-cache'),
        hint: gettext('This function is effective only if the hard drive supports it.'),
        value: false
      }
    ],
    buttons: [
      {
        template: 'submit',
        execute: {
          type: 'url',
          url: '/storage/disks'
        }
      },
      {
        template: 'cancel',
        execute: {
          type: 'url',
          url: '/storage/disks'
        }
      }
    ]
  };
}
