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

export type RequireUserDataParams = {
    page: number;
    results: number;
};

export interface SettingData {
    bookMark: string;
    userCount: number;
    dispalyMode: boolean;
}

export type UserDataArr = Array<UserData>;
export interface DisplayMode {
    name: string;
    component: ReturnType<typeof defineComponent>;
}
