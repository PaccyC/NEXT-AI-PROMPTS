import {Schema,models,model} from 'mongoose'

const promptSchema=new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt:{
        type:String,
        required:[true,"Prompt is required!"]
    },
    tag:{
        type:String,
        required:[true,"Tag is required"]
    }
})

const Prompt= model("Prompt",promptSchema);

export default Prompt;