import { HttpInterceptorFn }  from "@angular/common/http";

export const customHeaderInterseptor: HttpInterceptorFn=( request, next) => {
    const modifiedRequest = request.clone({
        setHeaders: {
            'custom-header': 'ANGULAR DATA TABLE',
        }
    });
    return next(modifiedRequest);
}