import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ApiService } from '../service/noidaweb.service';

export const ugProgramSlugGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {

  const apiService = inject(ApiService);

  // URL:
  // /ug/btech-cse
  const slug = segments[1]?.path;

  if (!slug) {
    return false;
  }

  console.log('Checking UG program slug:', slug);

  return apiService.getAllUgProgramsDetails(slug).pipe(

    map((data: any[]) => {

      const isProgram =
        Array.isArray(data) &&
        data.length > 0;

      console.log(
        'UG Program exists:',
        slug,
        isProgram
      );

      return isProgram;
    }),

    catchError((error) => {

      console.warn(
        'Program slug API failed:',
        slug,
        error
      );

      return of(false);
    })
  );
};