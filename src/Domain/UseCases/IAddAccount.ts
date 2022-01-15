import { IAccountModel } from "../Models/Account";

export interface  IAddAccountModel {
    Name: string,
    Email: string,
    Password: String
}

export interface  IAddAccount {
    Add (account: IAddAccountModel) : Promise<IAccountModel>
}