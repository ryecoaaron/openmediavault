import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { FormPageConfig } from '~/app/core/components/limn-ui/models/form-page-config.type';

@Component({
  template: '<omv-limn-form-page [config]="this.config"></omv-limn-form-page>'
})
export class InterfaceWifiFormPageComponent {
  public config: FormPageConfig = {
    request: {
      service: 'Network',
      get: {
        method: 'getWirelessIface',
        params: {
          uuid: '{{ _routeParams.uuid }}'
        }
      },
      post: {
        method: 'setWirelessIface'
      }
    },
    fields: [
      {
        type: 'confObjUuid'
      },
      {
        type: 'select',
        name: 'devicename',
        label: gettext('Device'),
        placeholder: gettext('Select a device ...'),
        textField: 'description',
        valueField: 'devicename',
        store: {
          proxy: {
            service: 'Network',
            get: {
              method:
                '{{ "enumerateDevices" if _routeConfig.data.editing else "getWirelessCandidates" }}'
            }
          },
          sorters: [
            {
              dir: 'asc',
              prop: 'devicename'
            }
          ]
        },
        value: '',
        disabled: '{{ _routeConfig.data.editing | toboolean }}',
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'wpassid',
        label: gettext('SSID'),
        value: '',
        validators: {
          required: true
        }
      },
      {
        type: 'passwordInput',
        name: 'wpapsk',
        label: gettext('Password'),
        value: '',
        autocomplete: 'new-password',
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'comment',
        label: gettext('Comment'),
        value: '',
        validators: {
          maxLength: 65
        }
      },
      {
        type: 'paragraph',
        text: gettext('IPv4')
      },
      {
        type: 'select',
        name: 'method',
        label: gettext('Method'),
        value: 'manual',
        store: {
          data: [
            ['manual', gettext('Disabled')],
            ['dhcp', gettext('DHCP')],
            ['static', gettext('Static')]
          ]
        },
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'address',
        label: gettext('Address'),
        value: '',
        validators: {
          patternType: 'ipv4',
          requiredIf: { operator: 'eq', arg0: { prop: 'method' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'textInput',
        name: 'netmask',
        label: gettext('Netmask'),
        value: '',
        validators: {
          patternType: 'netmask',
          requiredIf: { operator: 'eq', arg0: { prop: 'method' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'textInput',
        name: 'gateway',
        label: gettext('Gateway'),
        value: '',
        validators: {
          patternType: 'ipv4'
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'paragraph',
        text: gettext('IPv6')
      },
      {
        type: 'select',
        name: 'method6',
        label: gettext('Method'),
        value: 'manual',
        store: {
          data: [
            ['manual', gettext('Disabled')],
            ['dhcp', gettext('DHCP')],
            ['auto', gettext('Auto')],
            ['static', gettext('Static')]
          ]
        },
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'address6',
        label: gettext('Address'),
        value: '',
        validators: {
          patternType: 'ipv6',
          requiredIf: { operator: 'eq', arg0: { prop: 'method6' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'numberInput',
        name: 'netmask6',
        label: gettext('Prefix length'),
        value: 64,
        validators: {
          min: 0,
          max: 128,
          requiredIf: { operator: 'eq', arg0: { prop: 'method6' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'textInput',
        name: 'gateway6',
        label: gettext('Gateway'),
        value: '',
        validators: {
          patternType: 'ipv6'
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'paragraph',
        text: gettext('Advanced settings')
      },
      {
        type: 'textInput',
        name: 'dnsnameservers',
        label: gettext('DNS servers'),
        hint: gettext('IP addresses of domain name servers used to resolve host names.'),
        value: '',
        validators: {
          patternType: 'ipList'
        }
      },
      {
        type: 'textInput',
        name: 'dnssearch',
        label: gettext('Search domains'),
        hint: gettext('Domains used when resolving host names.'),
        value: '',
        validators: {
          patternType: 'domainNameList'
        }
      },
      {
        type: 'numberInput',
        name: 'mtu',
        label: gettext('MTU'),
        hint: gettext(
          'The maximum transmission unit in bytes to set for the device. Set to 0 to use the default value.'
        ),
        value: 0,
        validators: {
          min: 0,
          max: 65535
        }
      },
      {
        type: 'checkbox',
        name: 'wol',
        label: gettext('Wake-on-LAN'),
        value: false
      }
    ],
    buttons: [
      {
        template: 'submit',
        execute: {
          type: 'url',
          url: '/network/interfaces'
        }
      },
      {
        template: 'cancel',
        execute: {
          type: 'url',
          url: '/network/interfaces'
        }
      }
    ]
  };
}
