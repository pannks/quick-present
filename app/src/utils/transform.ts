import { format, isFuture, isPast, isToday } from "date-fns";

export function shortenLink(link: string) {
    try {
        const url = new URL(link);
        const pathnameParts = url.pathname.split("/");
        return `${url.hostname}/${pathnameParts[1]}/${pathnameParts[2].slice(
            0,
            3
        )}**`;
    } catch (e) {
        return link;
    }
}

export function transformName(fullName: string) {
    const nameParts = fullName.split(" ");

    if (nameParts.length < 2) {
        return fullName; // Return the original name if it doesn't have at least two parts
    }

    return `${nameParts[0]} ${nameParts[1][0]}.`;
}

export function formatDateToStr(date: Date): string {
    return format(date, "d MMM yyyy");
}

export function getColorDay(date: Date): string {
    const daysOfWeek = [
        "#c93a3d",
        "#ebd700",
        "#f299dc",
        "#71e35d",
        "#ffb60a",
        "#15a7e6",
        "#8a53db",
    ];
    return daysOfWeek[date.getDay()];
}

export function getStatusByDate(inputDate: Date | string): string {
    const date =
        typeof inputDate === "string" ? new Date(inputDate) : inputDate;

    if (isFuture(date)) {
        return "plan";
    } else if (isToday(date)) {
        return "live";
    } else if (isPast(date)) {
        return "done";
    }

    // Default return, just in case (this line should never be reached)
    return "unknown";
}
