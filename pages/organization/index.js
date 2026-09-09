import Head from 'next/head';
import Link from 'next/link';
import PublicLayout from '../../src/next/PublicLayout';
import { getPublicOrganizations } from '../../src/next/serverApi';

function OrganizationPage({ organizations, failed }) {
  return (
    <PublicLayout>
      <Head>
        <title>Maid agencies in Singapore | Helper4me</title>
        <meta name="description" content="Find maid agencies in Singapore and browse the domestic helpers they represent." />
        <link rel="canonical" href="https://www.helper4.me/organization" />
      </Head>
      <h1 className="page-title">Maid agencies in Singapore</h1>
      <p className="page-intro">Browse agencies and view their available domestic helper profiles.</p>
      {failed ? <p className="empty-state">Agency information is temporarily unavailable.</p> : null}
      {!failed && organizations.length === 0 ? <p className="empty-state">No agencies are currently available.</p> : null}
      <section className="card-grid" aria-label="Maid agencies">
        {organizations.map((organization) => (
          <article className="card" key={organization.id}>
            {organization.image ? <img className="card-image" src={organization.image} alt={`${organization.full_name || 'Maid agency'} logo`} /> : null}
            <h2><Link href={`/organization/${organization.id}`}>{organization.full_name || `Agency ${organization.id}`}</Link></h2>
            {organization.description ? <p>{organization.description}</p> : null}
          </article>
        ))}
      </section>
    </PublicLayout>
  );
}

export async function getServerSideProps() {
  try {
    const result = await getPublicOrganizations();
    return { props: { organizations: Array.isArray(result) ? result : [], failed: false } };
  } catch {
    return { props: { organizations: [], failed: true } };
  }
}

export default OrganizationPage;
