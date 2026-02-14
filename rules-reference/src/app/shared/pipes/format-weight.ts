import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'formatWeight',
    standalone: true,
})
export class FormatWeightPipe implements PipeTransform {
    transform(weightKg: number | undefined): string {
        if (!weightKg) {
            return '-';
        }
        if (weightKg < 1000) {
            return weightKg + ' kg';
        } else {
            return (weightKg / 1000) + ' t';
        }
    }
}