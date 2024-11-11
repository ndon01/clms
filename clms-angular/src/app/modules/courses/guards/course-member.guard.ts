import { CanActivateFn } from '@angular/router';

export const courseMemberGuard: CanActivateFn = (route, state) => {
  return true;
};
