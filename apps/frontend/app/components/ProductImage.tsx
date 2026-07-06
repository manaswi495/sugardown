import type {ProductFragment, ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

/** Any Storefront `Image` shape the Hydrogen `<Image />` can use (variant, featured, gallery, or media). */
export type ProductDisplayImage =
  | NonNullable<ProductVariantFragment['image']>
  | NonNullable<ProductFragment['featuredImage']>
  | NonNullable<
      NonNullable<ProductFragment['images']>['nodes']
    >[number]
  | NonNullable<
      Extract<
        ProductFragment['media']['nodes'][number],
        {__typename: 'MediaImage'}
      >['image']
    >
  | null
  | undefined;

export function ProductImage({image}: {image: ProductDisplayImage}) {
  if (!image?.url) {
    return <div className="product-image product-image--empty" />;
  }
  const key = image.id ?? image.url;
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        crop="center"
        data={image}
        key={key}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}
