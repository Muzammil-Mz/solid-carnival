import mongoose, { Model, Schema, Document } from "mongoose";

interface Irepos extends Document{
    Repo:string,
    description:string,
    visibility:string
}

const repoSchema:Schema=new Schema <Irepos>({
Repo:{
    type:String
},


})