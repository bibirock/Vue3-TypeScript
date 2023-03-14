import { defineComponent } from 'vue';
export interface UserData {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}
export interface SettingData {
    pageSize: number;
    displayMode: string;
    page: number;
}

export interface DisplayMode {
    name: string;
    component: ReturnType<typeof defineComponent>;
}

export interface ErrorType {
    status: ErrorStatus;
    title: string;
    subTitle: string;
}

export enum ErrorStatus {
    Nodata = 'NODATA',
    NetworkError = 'NETWORKERROR'
}

export type RequireUserDataParams = {
    page: number;
    results: number;
};

export type UserArray = Array<UserData>;

export type UserId = UserData['login']['uuid'];
