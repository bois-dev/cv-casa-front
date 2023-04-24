import { AxiosResponse } from 'axios';
import { HttpClient } from '../../components/infrastructure/httpclient.component';
import { SearchFields } from './search-users.interfaces';

export class SearchUsersService {
    private readonly request: HttpClient;

    constructor(){
        this.request = new HttpClient();
    }

    public async search(data: SearchFields): Promise<AxiosResponse<any, any>> {
        return this.request.post(`auth`, data);
    }
}


export default SearchUsersService;