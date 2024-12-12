import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import PropTypes from "prop-types";

const CloudinaryImage = ({publicId}) => {
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME } });
    // Use this sample image or upload your own via the Media Explorer
    const img = cld.image(publicId)
        .resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

    return (<AdvancedImage cldImg={img} className={'rounded-lg'}/>);
};

CloudinaryImage.propTypes = {
    publicId: PropTypes.string,
}

export default CloudinaryImage
