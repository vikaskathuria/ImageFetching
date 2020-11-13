import Axios from 'axios'
import { Get_Image } from './Config'

export const globalPostApi=(apiUrl,formData)=>{
let Url=apiUrl
let authOptions={
    method:"POST",
    url:Url,
    data:formData,

}
console.log("authOptions",authOptions);

return Axios(authOptions)
       .then((res)=>{
        console.log("posterr",res);

         return res.data
       })
       .catch((err)=>{
           console.log("posterr",err);
           throw err
       })
}