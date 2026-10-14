import { CanMatchFn, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ApiService } from '../service/noidaweb.service';

export const pgProgramSlugGuard: CanMatchFn = (
  route,
  segments: UrlSegment[]
) => {

  const apiService = inject(ApiService);

  // /pg/mba
  const slug = segments[1]?.path;

  if (!slug) {
    return false;
  }

  console.log('Checking PG program slug:', slug);

  return apiService.getAllPGProgramsDetails(slug).pipe(

    map((data: any[]) => {

      const isProgram =
        Array.isArray(data) &&
        data.length > 0;

      console.log(
        'PG Program exists:',
        slug,
        isProgram
      );

      return isProgram;
    }),

    catchError((error) => {

      console.warn(
        'PG Program slug API failed:',
        slug,
        error
      );

      return of(false);
    })
  );
};