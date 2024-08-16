export function formatDate(dateStr: string, separator?: string): string;
export function formatDate(date: Date, separator?: string, includeHours?: boolean): string;

export function formatDate(date: string | Date, separator: string = '/', includeHours: boolean = true): string {
    if (typeof date === 'string') {
        const [year, month, day] = date.split('-');

        return `${day}${separator}${month}${separator}${year}`;
    }
    else if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        let result = `${day}${separator}${month}${separator}${year}`;

        if (includeHours) {
            result += ` - ${hours}:${minutes}`;
        }

        return result;
    }

    return '';
}