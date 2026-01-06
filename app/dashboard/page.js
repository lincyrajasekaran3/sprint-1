export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    { cache: 'no-store' }
  );
  const data = await res.json();

  console.log('DASHBOARD RENDERED AT:', new Date().toISOString());

  return (
    <main>
      <h1>Dashboard (Dynamic / SSR)</h1>
      <p>Total posts: {data.length}</p>
    </main>
  );
}
