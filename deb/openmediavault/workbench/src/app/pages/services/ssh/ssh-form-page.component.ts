import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { FormPageConfig } from '~/app/core/components/limn-ui/models/form-page-config.type';

@Component({
  template: '<omv-limn-form-page [config]="this.config"></omv-limn-form-page>'
})
export class SshFormPageComponent {
  public config: FormPageConfig = {
    request: {
      service: 'SSH',
      get: {
        method: 'get'
      },
      post: {
        method: 'set'
      }
    },
    fields: [
      {
        type: 'checkbox',
        name: 'enable',
        label: gettext('Enabled'),
        value: false
      },
      {
        type: 'numberInput',
        name: 'port',
        label: gettext('Port'),
        value: 22,
        validators: {
          min: 0,
          max: 65535,
          patternType: 'port',
          requiredIf: { operator: 'eq', arg0: { prop: 'enable' }, arg1: true }
        }
      },
      {
        type: 'checkbox',
        name: 'permitrootlogin',
        label: gettext('Permit root login'),
        value: true,
        hint: gettext('Specifies whether it is allowed to login as superuser.')
      },
      {
        type: 'checkbox',
        name: 'passwordauthentication',
        label: gettext('Password authentication'),
        value: true,
        hint: gettext('Enable keyboard-interactive authentication.')
      },
      {
        type: 'checkbox',
        name: 'pubkeyauthentication',
        label: gettext('Public key authentication'),
        value: true,
        hint: gettext('Enable public key authentication.')
      },
      {
        type: 'checkbox',
        name: 'tcpforwarding',
        label: gettext('TCP forwarding'),
        value: true,
        hint: gettext('Permit to do SSH tunneling.')
      },
      {
        type: 'checkbox',
        name: 'compression',
        label: gettext('Compression'),
        value: true,
        hint: gettext(
          'Compression is worth using if your connection is slow. ' +
            'The efficiency of the compression depends on the type of the ' +
            'file, and varies widely. Useful for internet transfer only.'
        )
      },
      {
        type: 'textarea',
        name: 'extraoptions',
        label: gettext('Extra options'),
        hint: gettext(
          'Please check the <a href="https://man.openbsd.org/sshd_config.5" target="_blank">manual page</a> for more details.'
        ),
        value: ''
      }
    ],
    buttons: [
      {
        template: 'submit'
      },
      {
        template: 'cancel',
        execute: {
          type: 'url',
          url: '/services'
        }
      }
    ]
  };
}
