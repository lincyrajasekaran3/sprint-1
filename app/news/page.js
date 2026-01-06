export const revalidate = 60;

export default async function NewsPage() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts/2'
  );
  const data = await res.json();

  console.log('NEWS PAGE REGENERATED AT:', new Date().toISOString());

  return (
    <main>
      <h1>News Page (Hybrid / ISR)</h1>
      <p>{data.title}</p>
    </main>
  );
}
