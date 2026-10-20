import mutedMauveEnvelope from '../resources/kaifiyat/muted_mauve_envelope.webp';
import mutedMauveImageOne from '../resources/kaifiyat/muted_mauve_image_one.webp';
import mutedMauveImageTwo from '../resources/kaifiyat/muted_mauve_image_two.webp';
import mutedMauveImageThree from '../resources/kaifiyat/muted_mauve_image_three.webp';

import checkJeansEnvelope from '../resources/kaifiyat/check_jeans_envelope.webp';
import checkJeansImageOne from '../resources/kaifiyat/check_jeans_image_one.webp';
import checkJeansImageTwo from '../resources/kaifiyat/check_jeans_image_two.webp';
import checkJeansImageThree from '../resources/kaifiyat/check_jeans_image_three.webp';

import pinkGreyEnvelope from '../resources/kaifiyat/pink_grey_envelope.webp';
import pinkGreyImageOne from '../resources/kaifiyat/pink_grey_image_one.webp';
import pinkGreyImageTwo from '../resources/kaifiyat/pink_grey_image_two.webp';
import pinkGreyImageThree from '../resources/kaifiyat/pink_grey_image_three.webp';

import mutedMauvePhotoOne from '../resources/kaifiyat/muted_mauve_photo_one.webp';
import mutedMauvePhotoTwo from '../resources/kaifiyat/muted_mauve_photo_two.webp';
import mutedMauvePhotoThree from '../resources/kaifiyat/muted_mauve_photo_three.webp';
import mutedMauveCollectionEnvelope from '../resources/kaifiyat/muted_mauve_ioc.webp';
import mutedMauveCollectionPicture from '../resources/kaifiyat/muted_mauve_polaroid.webp';

import checkJeansPhotoOne from '../resources/kaifiyat/check_jeans_photo_one.webp';
import checkJeansPhotoTwo from '../resources/kaifiyat/check_jeans_photo_two.webp';
import checkJeansPhotoThree from '../resources/kaifiyat/check_jeans_photo_three.webp';
import checkJeansCollectionEnvelope from '../resources/kaifiyat/check_jeans_ioc.webp';
import checkJeansCollectionPicture from '../resources/kaifiyat/check_jeans_polaroid.webp';

import pinkGreyPhotoOne from '../resources/kaifiyat/pink_grey_photo_one.webp';
import pinkGreyPhotoTwo from '../resources/kaifiyat/pink_grey_photo_two.webp';
import pinkGreyPhotoThree from '../resources/kaifiyat/pink_grey_photo_three.webp';
import pinkGreyCollectionEnvelope from '../resources/kaifiyat/pink_grey_ioc.webp';
import pinkGreyCollectionPicture from '../resources/kaifiyat/pink_grey_polaroid.webp';

// Each article is one envelope with three photos laid on it, and a paper slip tucked underneath.
// Photo placement is taken from the Figma frame, as a percentage of the envelope's size,
// so the arrangement holds at every screen width. z decides which photo sits on top.
// The product fields (title, description, image_list, variantId) feed the shared product page;
// collectionEnvelope/collectionPicture are this piece's tile in its "In Same Collection" row
// (the picture is an upright copy of one of its polaroids, so it sits straight until hovered).
// Kaifiyat pieces come in one color each, so there is no color field.
const kaifiyatDetails = [
    {
        id: 0,
        envelopeImage: mutedMauveEnvelope,
        heading: "Muted Mauve",
        title: "Muted Mauve",
        description: "A traditional kurta pajama in a soft, muted mauve, reimagined for Gen Z.",
        image_list: [mutedMauvePhotoOne, mutedMauvePhotoTwo, mutedMauvePhotoThree],
        collectionEnvelope: mutedMauveCollectionEnvelope,
        collectionPicture: mutedMauveCollectionPicture,
        variantId: "",
        subHeading: "a traditional kurta pajama, reimagined for Gen Z",
        photos: [
            { src: mutedMauveImageOne, left: 4.2, top: 12, width: 35.7, z: 1, tilt: -2 },
            { src: mutedMauveImageTwo, left: 30.6, top: 19.4, width: 34.9, z: 3, tilt: 1.5 },
            { src: mutedMauveImageThree, left: 60.1, top: 12, width: 34.2, z: 2, tilt: 2 },
        ],
    },
    {
        id: 1,
        envelopeImage: checkJeansEnvelope,
        heading: "Check Jeans",
        title: "Check Jeans",
        description: "A completely new take on everyday Gen Z dressing: a denim shirt and jeans set with patterned patch pockets.",
        image_list: [checkJeansPhotoOne, checkJeansPhotoTwo, checkJeansPhotoThree],
        collectionEnvelope: checkJeansCollectionEnvelope,
        collectionPicture: checkJeansCollectionPicture,
        variantId: "",
        subHeading: "a completely new take on everyday Gen Z dressing.",
        photos: [
            { src: checkJeansImageOne, left: 2.6, top: 5.7, width: 35.7, z: 1, tilt: -2 },
            { src: checkJeansImageTwo, left: 31, top: 20.6, width: 35.2, z: 2, tilt: 1.5 },
            { src: checkJeansImageThree, left: 60.9, top: 23.6, width: 34.2, z: 3, tilt: 2 },
        ],
    },
    {
        id: 2,
        envelopeImage: pinkGreyEnvelope,
        heading: "Pink Grey",
        title: "Pink Grey",
        description: "A traditional kurta for the newer generation's vision, with a large printed patch stitched across the back.",
        image_list: [pinkGreyPhotoOne, pinkGreyPhotoTwo, pinkGreyPhotoThree],
        collectionEnvelope: pinkGreyCollectionEnvelope,
        collectionPicture: pinkGreyCollectionPicture,
        variantId: "",
        subHeading: "a traditional kurta and the newer generation's vision.",
        photos: [
            { src: pinkGreyImageThree, left: 4.7, top: 9.2, width: 36, z: 1, tilt: -2 },
            { src: pinkGreyImageTwo, left: 30.6, top: 20.9, width: 35, z: 3, tilt: 1.5 },
            { src: pinkGreyImageOne, left: 57.1, top: 11.7, width: 35.4, z: 2, tilt: 2 },
        ],
    },
];

export default kaifiyatDetails;
