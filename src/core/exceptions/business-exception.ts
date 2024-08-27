import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(public message: string, httpStatus: HttpStatus = HttpStatus.BAD_REQUEST) {
        super(message, httpStatus);
    }
}