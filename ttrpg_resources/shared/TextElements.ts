export type TextElement = 
{
    regularText: null;
    headerLine: null;
    bulletPoints: null;
} |
{
    regularText: string;
    headerLine: null;
    bulletPoints: null;
} |
{
    regularText: null;
    headerLine: string;
    bulletPoints: null;
} |
{
    regularText: null;
    headerLine: null;
    bulletPoints: string[];
};