export class ApiError {
  constructor(public status: number = 400, public message: string) {}

  static badRequest(msg: string) {
    return new ApiError(400, msg);
  }

  static internal(msg: string) {
    return new ApiError(500, msg);
  }

  static notFound(msg: string) {
    return new ApiError(404, msg);
  }

  static noContent(msg: string) {
    return new ApiError(204, msg);
  }

  static notAuthorized(msg: string) {
    return new ApiError(401, msg);
  }
}
