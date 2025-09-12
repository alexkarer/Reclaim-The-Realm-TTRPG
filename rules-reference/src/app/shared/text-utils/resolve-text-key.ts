import { Pipe, PipeTransform } from "@angular/core";

import textKeys from '../../../../../common_resources/textkeys.json';

@Pipe({
    name: 'resolveTextKey',
    standalone: true,
})
export class ResolveTextKeyPipe implements PipeTransform {

    textKeyMap = Object.values(textKeys)
        .flatMap(collection =>  Object.entries(collection))
        .reduce((map, textKey) => map.set(textKey[0], textKey[1]), new Map<string, string>());

    transform(key: string): string {
        const textKey = this.textKeyMap.get(key);

        if (!textKey) {
            console.error(`Unable to find text Key "${key}"`);
            return key;
        }
        return textKey;
    }
}