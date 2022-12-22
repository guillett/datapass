import { BadgeType } from '../components/atoms/hyperTexts/Badge';

export enum EnrollmentStatus {
  draft = 'draft',
  submitted = 'submitted',
  validated = 'validated',
  changes_requested = 'changes_requested',
  refused = 'refused',
  revoked = 'revoked',
}

export const STATUS_LABELS: {
  [key in EnrollmentStatus]: string;
} = {
  draft: 'Brouillon',
  submitted: 'En cours',
  validated: 'Validée',
  changes_requested: 'À changer',
  refused: 'Refusée',
  revoked: 'Révoquée',
};

export const STATUS_TO_BADGE_TYPE: {
  [key in EnrollmentStatus]: BadgeType | null;
} = {
  draft: null,
  submitted: BadgeType.info,
  validated: BadgeType.success,
  changes_requested: BadgeType.warning,
  refused: BadgeType.error,
  revoked: BadgeType.error,
};
