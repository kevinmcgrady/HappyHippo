import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { ProductReel } from '@/components/ProductReel';
import { CATEGORIES } from '@/constants/categories';

type Param = string | string[] | undefined;

type ProductsPageProps = {
  searchParams: {
    [key: string]: Param;
  };
};

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = CATEGORIES.find(({ value }) => value === category)?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? 'Browse high-quality assets'}
        query={{
          category,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;