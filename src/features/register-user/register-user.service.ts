import { AxiosResponse } from 'axios';
import { HttpClient } from '../../components/infrastructure/httpclient.component';
import { User } from '../../model/user.model';

export class RegisterService {
    private readonly request: HttpClient;

    constructor(){
        this.request = new HttpClient();
    }

    public async saveUser(data: User): Promise<AxiosResponse<any, any>> {
        return this.request.post(`auth`, data);
    }
}


export default RegisterService;