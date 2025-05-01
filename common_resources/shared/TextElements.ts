import { Ability } from "./Ability";

export type TextElement = 
{
    regularText: null;
    headerLine: null;
    bulletPoints: null;
    ability: null;
} |
{
    regularText: string;
    headerLine: null;
    bulletPoints: null;
    ability: null;
} |
{
    regularText: null;
    headerLine: string;
    bulletPoints: null;
    ability: null;
} |
{
    regularText: null;
    headerLine: null;
    bulletPoints: string[];
    ability: null;
} | 
{
    regularText: null;
    headerLine: null;
    bulletPoints: null;
    ability: Ability;
};

export type TextElementWithoutAbility = 
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