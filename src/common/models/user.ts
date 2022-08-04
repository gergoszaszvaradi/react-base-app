export interface User {
    id : number;
    email : string;
    firstName : string;
    lastName : string;
}

export interface UserCreationDto {
    email : string;
    firstName : string;
    lastName : string;
}
