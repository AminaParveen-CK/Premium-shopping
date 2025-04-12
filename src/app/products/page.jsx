import Products from '@/components/Products';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto mt-8">
       
      <h1 className="text-2xl font-bold mb-4 text-center">All Products</h1>
     
      <Products products={products} />
    </main>
  );
}
