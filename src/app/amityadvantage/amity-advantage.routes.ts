import { Routes } from '@angular/router';
import { AdvantageLayoutComponent } from './layout/advantage-layout.component';

export const AMITY_ADVANTAGE_ROUTES: Routes = [
  {
    path: '',
    component: AdvantageLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
      { path: 'alumni-success-stories', loadComponent: () => import('./pages/alumni-success-stories/alumni-success-stories.component').then((m) => m.AlumniSuccessStoriesComponent) },
      { path: 'career-development', loadComponent: () => import('./pages/career-development/career-development.component').then((m) => m.CareerDevelopmentComponent) },
      { path: 'caring-community', loadComponent: () => import('./pages/caring-community/caring-community.component').then((m) => m.CaringCommunityComponent) },
      { path: 'cultural-diversity', loadComponent: () => import('./pages/cultural-diversity/cultural-diversity.component').then((m) => m.CulturalDiversityComponent) },
      { path: 'global-exposure', loadComponent: () => import('./pages/global-exposure/global-exposure.component').then((m) => m.GlobalExposureComponent) },
      { path: 'industry-integrated-learning', loadComponent: () => import('./pages/industry-integrated-learning/industry-integrated-learning.component').then((m) => m.IndustryIntegratedLearningComponent) },
      { path: 'innovation-research', loadComponent: () => import('./pages/innovation-research/innovation-research.component').then((m) => m.InnovationResearchComponent) },
      { path: 'life-facilities', loadComponent: () => import('./pages/life-facilities/life-facilities.component').then((m) => m.LifeFacilitiesComponent) },
      { path: 'scholarships-financial-aid', loadComponent: () => import('./pages/scholarships-financial-aid/scholarships-financial-aid.component').then((m) => m.ScholarshipsFinancialAidComponent) },
      { path: 'sports-curricular', loadComponent: () => import('./pages/sports-curricular/sports-curricular.component').then((m) => m.SportsCurricularComponent) },
      { path: 'sustainability-green-campus', loadComponent: () => import('./pages/sustainability-green-campus/sustainability-green-campus.component').then((m) => m.SustainabilityGreenCampusComponent) },
      { path: 'world-class-campus', loadComponent: () => import('./pages/world-class-campus/world-class-campus.component').then((m) => m.WorldClassCampusComponent) },
      { path: '**', redirectTo: '' },
    ],
  },
];
