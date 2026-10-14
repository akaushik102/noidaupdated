import { CanMatchFn, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ApiService } from '../service/noidaweb.service';

export const phdProgramSlugGuard: CanMatchFn = (
  route,
  segments: UrlSegment[],
) => {
  const apiService = inject(ApiService);

  // /phd/phd-anthropology
  const slug = segments[1]?.path;

  if (!slug) {
    return false;
  }

  console.log('Checking PhD program slug:', slug);

  return apiService.GetPhdCourseDetails(slug).pipe(
    map((data: any[]) => {
      const isProgram = Array.isArray(data) && data.length > 0;

      console.log('PhD program exists:', slug, isProgram);

      return isProgram;
    }),

    catchError((error) => {
      console.warn('PhD slug API error:', slug, error);

      return of(false);
    }),
  );
};
