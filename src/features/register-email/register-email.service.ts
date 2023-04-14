import { AxiosResponse } from "axios";
import { HttpClient } from "../../components/infrastructure/httpclient.component";

export interface RegisterEmailRequest {
    password: string;
    email: string;
}

export default class RegisterEmailService {
    private readonly request: HttpClient;

    constructor() {
        this.request = new HttpClient();
    }

    public async register(data: RegisterEmailRequest): Promise<AxiosResponse<any, any>> {
        return this.request.post(`auth`, data);
    }

    public async check(id: string): Promise<AxiosResponse<any, any>> {
        return this.request.post(`check`, id);
    }
}