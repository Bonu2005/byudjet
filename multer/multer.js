import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
    cb(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})
let upload = multer({storage,limits:{fieldSize:10*1024**2}})
export default upload