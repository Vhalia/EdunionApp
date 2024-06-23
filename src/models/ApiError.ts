
class ApiError extends Error {
    public readonly status?: number;
    public readonly error: string;

    constructor(error: string, status?: number) {
        super(error);
        this.status = status;
        this.error = error;
    }
}

export default ApiError