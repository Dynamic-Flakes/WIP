export class User {
    id: string;
    cooperativeId: string;
    mode: string;
    name: string;
    usertype: string
}

// User type enum
export class UserType {
    types = [
        { id: 1, name: 'cooperator' },
        { id: 2, name: 'vendor' }
    ]
}

// User mode enum
export class Mode {
    types = [
        { id: 1, name: 'New' },
        { id: 2, name: 'OTPverify' },
        { id: 3, name: 'Confirm' }
    ]
}