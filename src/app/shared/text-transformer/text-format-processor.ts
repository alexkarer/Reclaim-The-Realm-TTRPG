const FORMAT_CMD = '$';
const FORMAT_CMD_START = 'S'
const FORMAT_CMD_END = 'E'

const FORMAT_CMD_NEWLINE = 'N';
const FORMAT_CMD_BOLD = 'B';
const FORMAT_CMD_LIST = 'L';
const FORMAT_CMD_LIST_ITEM= 'I';

const NEW_LINE = "<br>";

const BOLD_TEXT_START = '<span class="fw-bold">';
const BOLD_TEXT_END = '</span>';

const LIST_START = '<span><ul>';
const LIST_END = '</ul></span>';

const LIST_ITEM_START = '<li>';
const LIST_ITEM_END = '</li>';

export function processFormats(rawText: string): string {
    if (rawText.indexOf(FORMAT_CMD) === -1) {
        return rawText;
    }

    let processedText = '';
    let lastFormatCommandFound = 0;
    for (let i = 0; i < rawText.length; i++) {
        if (rawText.charAt(i) === FORMAT_CMD) {
            processedText += rawText.substring(lastFormatCommandFound, i);

            let commandCharStart = rawText.charAt(i + 1);
            if (commandCharStart === FORMAT_CMD_NEWLINE) {
                processedText += NEW_LINE;
                i += 1;
                lastFormatCommandFound = i + 1;
            } else if (commandCharStart === FORMAT_CMD_BOLD) {
                if (rawText.charAt(i + 2) === FORMAT_CMD_START) {
                    processedText += BOLD_TEXT_START;
                } else if (rawText.charAt(i + 2) === FORMAT_CMD_END) {
                    processedText += BOLD_TEXT_END;
                } else {
                    console.error('Unkown Format Command: "' + FORMAT_CMD.concat(commandCharStart.concat(rawText.charAt(i + 2))) + '" in text: ' + rawText);
                }

                i += 2;
                lastFormatCommandFound = i + 1;;
            } else if (commandCharStart === FORMAT_CMD_LIST) {
                if ((rawText.charAt(i + 2) === FORMAT_CMD_START)) {
                    processedText += LIST_START;
                } else if (rawText.charAt(i + 2) === FORMAT_CMD_END) {
                    processedText += LIST_END;
                } else {
                    console.error('Unkown Format Command: "' + FORMAT_CMD.concat(commandCharStart.concat(rawText.charAt(i + 2))) + '" in text: ' + rawText);
                }
                
                i += 2;
                lastFormatCommandFound = i + 1;;
            } else if (commandCharStart === FORMAT_CMD_LIST_ITEM) {
                if (rawText.charAt(i + 2) === FORMAT_CMD_START) {
                    processedText += LIST_ITEM_START;
                } else if (rawText.charAt(i + 2) === FORMAT_CMD_END) {
                    processedText += LIST_ITEM_END;
                } else {
                    console.error('Unkown Format Command: "' + FORMAT_CMD.concat(commandCharStart.concat(rawText.charAt(i + 2))) + '" in text: ' + rawText);
                }

                i += 2;
                lastFormatCommandFound = i + 1;;
            }

        } else if (i === rawText.length - 1) {
            processedText += rawText.substring(lastFormatCommandFound, i + 1);
        }
    }
    return processedText;
}
