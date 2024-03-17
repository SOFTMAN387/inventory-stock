const upload_preset =process.env.REACT_APP_CLOUDINARY_PRESET_NAME;
const cloud_name=process.env.REACT_APP_CLOUDINARY_NAME;

const uploadImageToCloudinary=async(file)=>{

    const uploadData = new FormData()
    console.log(process.env.REACT_APP_CLOUDINARY_PRESET_NAME);
    uploadData.append('file',file);
    uploadData.append('upload_preset',upload_preset);
    uploadData.append('cloud_name',cloud_name);

    const res=await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
        method:"post",
        body:uploadData
    })
    const data=await res.json();

    return data;
}

export default uploadImageToCloudinary;