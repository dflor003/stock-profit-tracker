import { Breakpoints } from '@angular/cdk/layout';

export type BreakpointShorthand =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '>=xs'
  | '>=sm'
  | '>=md'
  | '>=lg'
  | '>=xl'
  | '<=xs'
  | '<=sm'
  | '<=md'
  | '<=lg'
  | '<=xl'
  | 'handset'
  | 'mobile' // Alias for handset
  | 'tablet'
  | 'web'
  | 'desktop' // Alias for web
  | 'handset-portrait'
  | 'handset-landscape'
  | 'mobile-portrait'
  | 'mobile-landscape'
  | 'tablet-portrait'
  | 'tablet-landscape'
  | 'web-portrait'
  | 'web-landscape'
  | 'desktop-portrait'
  | 'desktop-landscape'
  | 'portrait'
  | 'landscape';

export const ORIENTATION_PORTRAIT = '(orientation=portrait)';
export const ORIENTATION_LANDSCAPE = '(orientation=landscape)';

const ShorthandToBreakpointMap: Record<BreakpointShorthand, string[]> = {
  'xs': [Breakpoints.XSmall],
  'sm': [Breakpoints.Small],
  'md': [Breakpoints.Medium],
  'lg': [Breakpoints.Large],
  'xl': [Breakpoints.XLarge],
  '>=xs': [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ],
  '>=sm': [
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ],
  '>=md': [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge],
  '>=lg': [Breakpoints.Large, Breakpoints.XLarge],
  '>=xl': [Breakpoints.XLarge],
  '<=xs': [Breakpoints.XSmall],
  '<=sm': [Breakpoints.XSmall, Breakpoints.Small],
  '<=md': [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium],
  '<=lg': [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
  ],
  '<=xl': [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ],
  'handset': [Breakpoints.Handset],
  'mobile': [Breakpoints.Handset],
  'tablet': [Breakpoints.Tablet],
  'web': [Breakpoints.Web],
  'desktop': [Breakpoints.Web],
  'handset-portrait': [Breakpoints.HandsetPortrait],
  'handset-landscape': [Breakpoints.HandsetLandscape],
  'mobile-portrait': [Breakpoints.HandsetPortrait],
  'mobile-landscape': [Breakpoints.HandsetLandscape],
  'tablet-portrait': [Breakpoints.TabletPortrait],
  'tablet-landscape': [Breakpoints.TabletLandscape],
  'web-portrait': [Breakpoints.WebPortrait],
  'web-landscape': [Breakpoints.WebLandscape],
  'desktop-portrait': [Breakpoints.WebPortrait],
  'desktop-landscape': [Breakpoints.WebLandscape],
  'portrait': [ORIENTATION_PORTRAIT],
  'landscape': [ORIENTATION_LANDSCAPE],
};

export function breakpointsForShorthand(
  shorthand: BreakpointShorthand,
): string[] {
  const result = ShorthandToBreakpointMap[shorthand];
  if (!result) {
    throw new Error(`No matching breakpoint for ${shorthand}`);
  }

  return result;
}
