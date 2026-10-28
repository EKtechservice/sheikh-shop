export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Classic Silk Thobe",
      category: "Apparel",
      price: "$120.00",
      tag: "Best Seller",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      id: 2,
      name: "Royal Oud Parfum",
      category: "Fragrances",
      price: "$85.00",
      tag: "Exclusive",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    },
    {
      id: 3,
      name: "Handcrafted Leather Keffiyeh Ring",
      category: "Accessories",
      price: "$45.00",
      tag: "New Arrival",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      id: 4,
      name: "Embroidered Bisht (Gold Trim)",
      category: "Apparel",
      price: "$290.00",
      tag: "Premium",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-lg dark:bg-white dark:text-zinc-900">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">Sheikh Shop</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#featured" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Featured
            </a>
            <a href="#categories" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Categories
            </a>
            <a href="#about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 transition-colors">
              Sign In
            </button>
            <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
              Cart (0)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white py-24 dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-block rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Welcome to Sheikh Shop
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Elegance, Tradition &amp; <span className="text-amber-600 dark:text-amber-400">Luxury</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Discover our curated collection of luxury apparel, authentic fragrances, and exquisite accessories crafted with the finest attention to detail.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#featured"
              className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all"
            >
              Explore Collection
            </a>
            <a
              href="#categories"
              className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 transition-all"
            >
              View Categories
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Collection</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Handpicked items chosen for distinguished taste.</p>
            </div>
            <a href="#all" className="text-sm font-semibold text-amber-600 hover:text-amber-500 dark:text-amber-400">
              See all &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-medium ${product.badgeColor}`}>
                      {product.tag}
                    </span>
                    <span className="text-xs text-zinc-500">{product.category}</span>
                  </div>

                  <div className="mt-6 flex h-40 w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:scale-[1.02] transition-transform">
                    <span className="text-3xl">✨</span>
                  </div>

                  <h3 className="mt-4 font-semibold text-base tracking-tight">{product.name}</h3>
                  <p className="mt-1 font-bold text-lg text-zinc-900 dark:text-zinc-100">{product.price}</p>
                </div>

                <button className="mt-5 w-full rounded-xl bg-zinc-900 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>&copy; 2026 Sheikh Shop. All rights reserved. Powered by Next.js &amp; Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
