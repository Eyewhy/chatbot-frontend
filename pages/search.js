import Head from 'next/head';
import Link from 'next/link';
import PublicLayout from '../src/next/PublicLayout';
import { getPublicHelpers } from '../src/next/serverApi';

function helperName(helper) {
  return helper.personal_info_name || `Helper ${helper.id}`;
}

function SearchPage({ helpers, failed }) {
  return (
    <PublicLayout>
      <Head>
        <title>Find a helper in Singapore | Helper4me</title>
        <meta name="description" content="Browse helper profiles and find the right domestic helper for your family in Singapore." />
        <link rel="canonical" href="https://www.helper4.me/search" />
      </Head>
      <h1 className="page-title">Find your perfect helper with Helper4me</h1>
      <p className="page-intro">Browse available domestic helper profiles in Singapore. Open a profile to view experience, skills, availability and agency details.</p>
      {failed ? <p className="empty-state">Helper profiles are temporarily unavailable. Please try again later.</p> : null}
      {!failed && helpers.length === 0 ? <p className="empty-state">No helper profiles are currently available.</p> : null}
      <section className="card-grid" aria-label="Helper profiles">
        {helpers.map((helper) => (
          <article className="card" key={helper.id}>
            {helper.image ? <img className="card-image" src={helper.image} alt={`${helperName(helper)} profile`} /> : <div className="placeholder-image">Image unavailable</div>}
            <h2><Link href={`/biodata/${helper.id}`}>{helperName(helper)}</Link></h2>
            <dl className="info-list">
              <dt>Nationality</dt><dd>{helper.personal_info_nationality || 'Not specified'}</dd>
              <dt>Type</dt><dd>{helper.personal_info_type || 'Not specified'}</dd>
              <dt>Reference</dt><dd>{helper.personal_info_ref || helper.id}</dd>
            </dl>
          </article>
        ))}
      </section>
    </PublicLayout>
  );
}

export async function getServerSideProps() {
  try {
    const result = await getPublicHelpers({});
    return { props: { helpers: Array.isArray(result) ? result : [], failed: false } };
  } catch {
    return { props: { helpers: [], failed: true } };
  }
}

export default SearchPage;
