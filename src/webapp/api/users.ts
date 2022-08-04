import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { User, UserCreationDto } from "common/models/user";

interface UserApi {
    getUsers() : UseQueryResult<User[]>;
    postUser() : UseMutationResult<UserCreationDto>;
}

export const useUserApi = () : UserApi => ({
    getUsers() : UseQueryResult<User[]> {
        return useQuery(["users"], async () => (await axios.get<User[]>("/api/users")).data);
    },
    postUser() : UseMutationResult<UserCreationDto> {
        const queryClient = useQueryClient();
        return useMutation(async (user) => axios.post("/api/users", user), {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
            },
        });
    },
});
