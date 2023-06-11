export interface UserModel {
    id: number,
    name: string,
    email: string,
    password: string
}

export let users: UserModel[] = [
    {
        id: 1,
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'adminPassword123!'
    },
    {
        id: 2,
        name: 'Maya Malla',
        email: 'maya@gmail.com',
        password: 'mayapassword!'
    }
]