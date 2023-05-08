import { AxiosResponse } from 'axios';
import { HttpClient } from '../../components/infrastructure/httpclient.component';
import { Realtor } from '../../model/realtor.model';

export class RegisterRealtorService {
    private readonly request: HttpClient;

    constructor(){
        this.request = new HttpClient();
    }

    public async save(data: Realtor): Promise<AxiosResponse<any, any>> {
        return this.request.post(`auth`, data);
    }

    public async check(id: string): Promise<AxiosResponse<any, any>> {
        return this.request.post(`check`, id);
    }
}


export default RegisterRealtorService;