import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { CollectionConfig } from 'payload/types';

import { CATEGORIES } from '../../constants/categories';
import { stripe } from '../../lib/stripe';
import { Product } from '../../payload-types';

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;
  return {
    ...data,
    user: user.id,
  };
};

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {},
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === 'create') {
          const data = args.data as Product;

          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: 'GBP',
              unit_amount: Math.round(data.price * 100),
            },
          });

          const updatedProduct: Product = {
            ...data,
            stripe_id: createdProduct.id,
            price_id: createdProduct.default_price as string,
          };

          return updatedProduct;
        } else if (args.operation === 'update') {
          const data = args.data as Product;

          const updatedProduct = await stripe.products.update(data.stripe_id!, {
            name: data.name,
            default_price: data.price_id!,
          });

          const product: Product = {
            ...data,
            stripe_id: updatedProduct.id,
            price_id: updatedProduct.default_price as string,
          };

          return product;
        }
      },
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Product details',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      label: 'Price in GBP',
      min: 0,
      max: 1000,
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: CATEGORIES.map(({ label, value }) => ({
        label,
        value,
      })),
      required: true,
    },
    {
      name: 'product_files',
      label: 'Product file(s)',
      type: 'relationship',
      required: true,
      relationTo: 'product_files',
      hasMany: false,
    },
    {
      name: 'approved_for_sale',
      label: 'Product status',
      type: 'select',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
      },
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending verfication',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Denied',
          value: 'denied',
        },
      ],
    },
    {
      name: 'price_id',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripe_id',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
