export const revalidate = false;

export default async function AboutPage() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts/1'
  );
  const data = await res.json();

  console.log('ABOUT PAGE BUILT AT:', new Date().toISOString());

  return (
    <main>
      <h1>About Page (Static / SSG)</h1>
      <p>{data.title}</p>
    </main>
  );
}
