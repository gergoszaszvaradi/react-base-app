import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { User } from "common/models/user";

interface UserApi {
    getUsers() : UseQueryResult<User[]>;
    postUser() : UseMutationResult<User>;
}

export const useUserApi = () : UserApi => ({
    getUsers() : UseQueryResult<User[]> {
        return useQuery(["users"], async () => (await axios.get<User[]>("/api/users")).data);
    },
    postUser() : UseMutationResult<User> {
        const queryClient = useQueryClient();
        return useMutation(async (user) => axios.post("/api/users", user), {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
            },
        });
    },
});
