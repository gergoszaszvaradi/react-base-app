import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

export interface User {
    id : number;
    email : string;
    first_name : string;
    last_name : string;
    avatar : string;
}

interface UserApiResponse {
    page : number;
    per_page : number;
    total : number;
    total_pages : number;
    data : User[];
}

interface UserApi {
    getUsers(page ?: number) : UseQueryResult<UserApiResponse>;
}

export const useUserApi = () : UserApi => ({
    getUsers(page = 1) : UseQueryResult<UserApiResponse> {
        return useQuery(["users"], async () => (await axios.get<UserApiResponse>(`https://reqres.in/api/users?page=${page}`)).data);
    },
});
