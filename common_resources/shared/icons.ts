export function mapIconPath(s: string) {
    // needed for foundryvtt compability
    if (s.startsWith('icon')) {
        return '/assets/' + s 
    }
    return s;
}