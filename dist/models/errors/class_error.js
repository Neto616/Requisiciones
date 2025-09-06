export class ErrorInitMethod extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorInitMethod";
    }
}
export class ErrorFinding extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorFinding";
    }
}
export class ErrorUpdating extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorUpdating";
    }
}
export class ErrorDeleting extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorDeleting";
    }
}
