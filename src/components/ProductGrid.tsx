
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-serif font-medium text-evermore-dark">No products found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later for new arrivals.</p>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      {title && (
        <h2 className="text-3xl font-serif font-medium text-evermore-dark mb-8 text-center">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="animate-fade-in">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
