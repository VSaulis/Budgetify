export class StringHelper {

    static capitalize(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
