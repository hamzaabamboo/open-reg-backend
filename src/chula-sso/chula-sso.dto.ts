export interface ChulaSsoSuccessResponse {
    uid: string;
    username: string;
    gecos: string;
    email: string;
    roles: string[];
    ouid: string;
    firstname: string;
    lastname: string;
    firstnameth: string;
    lastnameth: string;
}

export interface ChulaSsoFailedResponse {
    type: string;
    content: string;
}
