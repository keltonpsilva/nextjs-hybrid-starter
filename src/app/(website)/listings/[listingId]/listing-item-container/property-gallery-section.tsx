import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import { ListingPropertyFile } from "@/shared/contracts/responses/listing-response";

import environment from "@/lib/environment";

const defaultPropertyImages = [
  {
    original: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    original: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  },
  {
    original: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24",
    thumbnail: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24",
  },
  {
    original: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
    thumbnail: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
  },
  {
    original: "https://images.unsplash.com/photo-1600607688066-890987f18a86",
    thumbnail: "https://images.unsplash.com/photo-1600607688066-890987f18a86",
  },
];

const formatToImageGallery = (
  items: Array<ListingPropertyFile>
): ReactImageGalleryItem[] => {
  return items.map((item) => ({
    original: `${environment.BlobStorageUrl}/properties/${item.externalId}`,
    thumbnail: `${environment.BlobStorageUrl}/properties/${item.externalId}`,
  }));
};

export default function PropertyGallerySection({
  propertyImages,
}: {
  propertyImages: Array<ListingPropertyFile>;
}) {
  if (!environment.IsProduction) {
    const galleryItems =
      propertyImages && propertyImages.length > 0
        ? formatToImageGallery(propertyImages)
        : defaultPropertyImages;

    return (
      <div className="mt-4">
        <ImageGallery
          items={galleryItems}
          additionalClass=""
          thumbnailPosition="right"
        />
      </div>
    );
  }

  const galleryItems =
    environment.IsProduction && propertyImages && propertyImages.length > 0
      ? formatToImageGallery(propertyImages)
      : [
          {
            original:
              "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b",
            thumbnail:
              "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b",
          },
        ];

  return (
    <div className="mt-4">
      <ImageGallery
        items={galleryItems}
        additionalClass=""
        thumbnailPosition="right"
      />
    </div>
  );
}
