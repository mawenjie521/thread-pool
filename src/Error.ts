import IError from "./types/IError";
import {codeStatus} from "./constants";

class Error implements IError{
    code: codeStatus;
    error: any;
    constructor(code: codeStatus, error: any){
        this.code = code;
        this.error = error;
    }
}

export default Error;