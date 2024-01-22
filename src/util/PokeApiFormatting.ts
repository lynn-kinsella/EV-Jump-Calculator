export function responseToDisplayName(name: string): string {
    var displayName = ""
    var words = name.split("-")
    words.forEach((word) => {
        displayName += word.charAt(0).toUpperCase() + word.slice(1) + " "
    })
    return displayName.slice(0, displayName.length - 1);
}

export function displayNameToResponse(name: string): string {
    return (name.toLowerCase()).replace(" ", "-");
}

export function getIdFromURL(url: string): number {
    const splitURL: string[] = url.split("/");
    return parseInt(splitURL[splitURL.length - 2])
}