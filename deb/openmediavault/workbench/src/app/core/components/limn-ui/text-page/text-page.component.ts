import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';
import * as _ from 'lodash';
import { EMPTY, Subscription, timer } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AbstractPageComponent } from '~/app/core/components/limn-ui/abstract-page-component';
import {
  TextPageButtonConfig,
  TextPageConfig
} from '~/app/core/components/limn-ui/models/text-page-config.type';
import { Icon } from '~/app/shared/enum/icon.enum';
import { AuthSessionService } from '~/app/shared/services/auth-session.service';
import { ClipboardService } from '~/app/shared/services/clipboard.service';
import { RpcService } from '~/app/shared/services/rpc.service';

/**
 * Display text in a read-only textarea using a non-proportional font.
 */
@Component({
  selector: 'omv-limn-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent
  extends AbstractPageComponent<TextPageConfig>
  implements OnInit, OnDestroy {
  public error: HttpErrorResponse;
  public icon = Icon;
  public loading = false;
  public text = '';

  private reloadSubscription: Subscription;

  constructor(
    @Inject(ActivatedRoute) activatedRoute: ActivatedRoute,
    @Inject(AuthSessionService) authSessionService: AuthSessionService,
    private clipboardService: ClipboardService,
    private router: Router,
    private rpcService: RpcService
  ) {
    super(activatedRoute, authSessionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.reloadSubscription = timer(
      0,
      _.isNumber(this.config.autoReload) ? (this.config.autoReload as number) : null
    ).subscribe(() => {
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.reloadSubscription?.unsubscribe();
    super.ngOnDestroy();
  }

  onCopyToClipboard() {
    this.clipboardService.copy(this.text);
  }

  onButtonClick(buttonConfig: TextPageButtonConfig) {
    if (_.isFunction(buttonConfig.click)) {
      buttonConfig.click();
    } else {
      this.router.navigate([buttonConfig.url]);
    }
  }

  protected sanitizeConfig() {
    _.defaultsDeep(this.config, {
      autoReload: false,
      hasReloadButton: false,
      hasCopyToClipboardButton: false,
      buttonAlign: 'left',
      buttons: []
    });
    // Set the default values of the buttons.
    _.forEach(this.config.buttons, (button) => {
      const template = _.get(button, 'template');
      switch (template) {
        case 'back':
          _.defaultsDeep(button, {
            text: gettext('Back')
          });
          break;
        case 'cancel':
          _.defaultsDeep(button, {
            text: gettext('Cancel')
          });
          break;
      }
    });
  }

  protected onRouteParams() {
    // Format tokenized configuration properties.
    this.formatConfig(['title', 'subTitle', 'request.get.method', 'request.get.params']);
  }

  private loadData() {
    if (
      _.isPlainObject(this.config.request) &&
      _.isString(this.config.request.service) &&
      _.isPlainObject(this.config.request.get)
    ) {
      this.loading = true;
      // noinspection DuplicatedCode
      this.rpcService[this.config.request.get.task ? 'requestTask' : 'request'](
        this.config.request.service,
        this.config.request.get.method,
        this.config.request.get.params
      )
        .pipe(
          catchError((error) => {
            this.error = error;
            return EMPTY;
          }),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((res: any) => {
          this.text = res;
        });
    }
  }
}
