import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpResponse,HttpHandler,HttpEvent,HttpErrorResponse} from '@angular/common/http';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    
    constructor(
        ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        // request = request.clone({ headers: request.headers.set('Freaky', 'Jolly') });
        let setHeaderData:any={
            'Content-Type':'application/json',
            'Accept':'application/json',
            'name':'Manish'
        };
        request = request.clone({
            setHeaders:setHeaderData
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                // data = {
                //     domain: error.domain,
                //     message: error.message,
                //     reason: error.reason
                // };
                // console.log(data);
                return throwError(error);
            }));
    }
}