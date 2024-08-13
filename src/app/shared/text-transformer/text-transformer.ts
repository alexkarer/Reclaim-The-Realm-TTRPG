import { Pipe, PipeTransform } from "@angular/core";
import { processFormats } from "./text-format-processor";

@Pipe({
    name: 'textTransform',
    standalone: true,
})
export class TextTransformerPipe implements PipeTransform {
    transform(text: string | undefined): string {
        if (!text) {
            return '';
        }
        let processedText = processFormats(text);
        // TODO keywords, maybe abilities if want to be fancy
        return processedText;
    }
}
