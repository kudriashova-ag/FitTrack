// =============================================================
// src/constants/theme.ts
// =============================================================

export const COLORS = {
  primary:     '#6366F1',
  secondary:   '#8B5CF6',

  strength:    '#6366F1',
  cardio:      '#EF4444',
  flexibility: '#10B981',

  background:  '#F9FAFB',
  surface:     '#FFFFFF',
  border:      '#E5E7EB',

  textPrimary:   '#111827',
  textSecondary: '#6B7280',
  textTertiary:  '#9CA3AF',

  success: '#10B981',
  warning: '#F59E0B',
  error:   '#EF4444',
} as const;

export const SPACING = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,
} as const;

export const FONT_SIZE = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   17,
  xl:   20,
  xxl:  24,
  xxxl: 28,
} as const;

export const BORDER_RADIUS = {
  sm:   6,
  md:   10,
  lg:   14,
  xl:   20,
  full: 9999,
} as const;

export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;
