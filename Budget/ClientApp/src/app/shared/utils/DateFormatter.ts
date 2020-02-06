export class DateFormatter {

    static toDateString(bootstrapDateObject): string {
        if (!bootstrapDateObject) {
            return null;
        }

        const date = new Date(bootstrapDateObject.year, bootstrapDateObject.month - 1, bootstrapDateObject.day + 1);
        return date.toISOString().split('T')[0];
    }

    static trimDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    static toBootstrapObject(dateString: string): any {
        if (!dateString) {
            return null;
        }

        const date = new Date(dateString);

        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
}
