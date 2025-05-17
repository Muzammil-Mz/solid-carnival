import mongoose,{Document,Schema,Model} from "mongoose"


interface Iuser extends Document{
    username:string,
    email:string,
    password:string,
    phone:string,
    employmentStatus:string

}

const userSchema =new Schema<Iuser>({
    username:{
        type:String
    },
    email:{
        type:stiring
    
})