import { IRentAreaInterface } from "./rent.area.interfaces"
import { IUserInterface } from "./user.interfaces"

export type IRentPostInterface=
{
    id?: string,
    heading: string,
    description: string,
    rent: number,
    bed: number,
    bath: number,
    size: number,
    image: string,

    author: IUserInterface,
    area: IRentAreaInterface,

    createdAt: Date,
    updatedAt: Date,

    userUsername: string,
    rentAreaName: string
}