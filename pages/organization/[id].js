import Head from 'next/head';
import Link from 'next/link';
import PublicLayout from '../../src/next/PublicLayout';
import { getPublicHelpers, getPublicOrganization } from '../../src/next/serverApi';

function OrganizationDetailPage({ organization, helpers, failed }) {
  const name = organization.full_name || `Agency ${organization.id}`;
  return (
    <PublicLayout>
      <Head>
        <title>{name} | Maid agency in Singapore | Helper4me</title>
        <meta name="description" content={organization.description || `View ${name} and the domestic helpers available through this Singapore maid agency.`} />
        <link rel="canonical" href={`https://www.helper4.me/organization/${organization.id}`} />
      </Head>
      {failed ? <p className="empty-state">This agency profile is unavailable.</p> : (
        <>
          <h1 className="page-title">{name}</h1>
          <div className="detail-layout">
            <aside className="detail-panel">
              {organization.image ? <img className="card-image" src={organization.image} alt={`${name} logo`} /> : null}
              {organization.description ? <p>{organization.description}</p> : null}
              {organization.address ? <p>{organization.address}</p> : null}
            </aside>
            <section className="detail-panel">
              <h2>Available helpers</h2>
              <p>{helpers.length} helper profiles available.</p>
              {helpers.length === 0 ? <p className="empty-state">No helper profiles are currently listed for this agency.</p> : (
                <div className="card-grid">
                  {helpers.map((helper) => (
                    <article className="card" key={helper.id}>
                      {helper.image ? <img className="card-image" src={helper.image} alt={`${helper.personal_info_name || `Helper ${helper.id}`} profile`} /> : null}
                      <h3><Link href={`/biodata/${helper.id}`}>{helper.personal_info_name || `Helper ${helper.id}`}</Link></h3>
                      <p>{helper.personal_info_nationality || 'Nationality not specified'}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </PublicLayout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const organization = await getPublicOrganization(params.id);
    const result = await getPublicHelpers({ agency: [params.id] });
    return { props: { organization, helpers: Array.isArray(result) ? result : [], failed: false } };
  } catch {
    return { notFound: true };
  }
}

export default OrganizationDetailPage;
