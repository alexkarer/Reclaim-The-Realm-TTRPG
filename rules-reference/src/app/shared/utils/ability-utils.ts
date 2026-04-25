import { DurationUnit } from "../../../../../common_resources/shared/ability";

export function formatDurationUnit(unit?: DurationUnit, durationAmount?: number): string {
    switch(unit) {
      case DurationUnit.ROUND: return ((durationAmount ?? 0) > 1 ? '[ROUNDS]' : '[ROUND]');
      case DurationUnit.HOUR: return ((durationAmount ?? 0) > 1 ? 'Hours' : 'Hour');
      case DurationUnit.MINUTE: return ((durationAmount ?? 0) > 1 ? 'Minutes' : 'Minute');
      case DurationUnit.INDEFINATE: return '';
      case DurationUnit.NONE: return '';
    }
    return '';
  }