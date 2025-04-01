export interface IRowDetail {
    _id: string;
    name: string;
    phone: string;
    fields: {
        class: string;
        board: string;
        address: string;
        phoneNumber: string;
        email: string;
        fatherOccupation: string;
        motherOccupation: string;
        alternativeNumber: string;
        parentName: string;
        schoolName: string;
        city: string;
        state: string;
        percentage: string;
        interactWith: string;
    };
    assignedAdmin: string | null;
    // region: string | null;
    region:Record<string,string>;
    createdAt: string;
    updatedAt: string;
    __v: number;
    assignedOwner: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    } | null;
    favorite: boolean;
}
