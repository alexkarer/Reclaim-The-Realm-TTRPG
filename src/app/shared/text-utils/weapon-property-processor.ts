import { Pipe, PipeTransform } from '@angular/core';
import { WeaponProperty, WeaponPropertyType } from '../../../../ttrpg_resources/equipment/weapons/weapons';
import { generateGenericKeyword, ContentPart } from './text-utils';

import weaponRulesJson from '../../../../ttrpg_resources/equipment/weapons/weaponRules.json';

@Pipe({
    name: 'weaponPropertyProcessor',
    standalone: true,
})
export class WeaponPropertyProcessor implements PipeTransform {
    transform(weaponProperties: WeaponProperty[]): ContentPart[] {
        if (weaponProperties.length === 0) {
            return [{type: 'text', text: '-'}]
        }
        let content: ContentPart[] = [];
        weaponProperties.forEach(wp => {
            content.push(generateGenericKeyword(wp.getPrettyString(), getPropertyDescription(wp.type), 'weapon-properties'));
            content.push({type: 'text', text: ', '})
        });
        content.pop();
        return content;
    }
}

function getPropertyDescription(type: WeaponPropertyType): string {
    let description = weaponRulesJson.weaponProperties
        .filter(wp => {
            let propertyName = wp.name.split('(')[0];
            return propertyName === type;
        }).map(wp => wp.description)[0];

    if (!description) {
        return '';
    }
    return description;
} 