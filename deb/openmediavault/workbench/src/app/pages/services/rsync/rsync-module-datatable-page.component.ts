import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { DatatablePageConfig } from '~/app/core/components/limn-ui/models/datatable-page-config.type';

@Component({
  template: '<omv-limn-datatable-page [config]="this.config"></omv-limn-datatable-page>'
})
export class RsyncModuleDatatablePageComponent {
  public config: DatatablePageConfig = {
    autoReload: false,
    stateId: '5b146d0b-2250-4ea2-a16d-bddb7e66724e',
    sorters: [
      {
        dir: 'asc',
        prop: 'name'
      }
    ],
    store: {
      proxy: {
        service: 'Rsyncd',
        get: {
          method: 'getModuleList'
        }
      }
    },
    columns: [
      {
        name: gettext('Enabled'),
        prop: 'enable',
        flexGrow: 1,
        sortable: true,
        cellTemplateName: 'checkIcon'
      },
      {
        name: gettext('Shared folder'),
        prop: 'sharedfoldername',
        flexGrow: 1,
        sortable: true
      },
      {
        name: gettext('Name'),
        prop: 'name',
        flexGrow: 1,
        sortable: true
      },
      {
        name: gettext('Comment'),
        prop: 'comment',
        flexGrow: 1,
        sortable: true
      }
    ],
    actions: [
      {
        template: 'create',
        execute: {
          type: 'url',
          url: '/services/rsync/server/modules/create'
        }
      },
      {
        template: 'edit',
        execute: {
          type: 'url',
          url: '/services/rsync/server/modules/edit/{{ _selected[0].uuid }}'
        }
      },
      {
        template: 'delete',
        execute: {
          type: 'request',
          request: {
            service: 'Rsyncd',
            method: 'deleteModule',
            params: {
              uuid: '{{ _selected[0].uuid }}'
            }
          }
        }
      }
    ]
  };
}
