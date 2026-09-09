import Head from 'next/head';
import PublicLayout from '../../src/next/PublicLayout';
import { getPublicHelper, getPublicOrganization } from '../../src/next/serverApi';

const fields = [
  ['Nationality', 'personal_info_nationality'],
  ['Type', 'personal_info_type'],
  ['Education', 'education_highest_education_level'],
  ['Languages', 'skills_spoken_language_categories'],
  ['Date of birth', 'personal_info_date_of_birth'],
  ['Religion', 'personal_info_religion'],
  ['Height', 'personal_info_height'],
  ['Weight', 'personal_info_weight'],
  ['Monthly salary', 'salary_monthly_salary'],
  ['Rest days per month', 'salary_rest_days_per_month_total'],
  ['Rest day preference', 'remarks_preference_for_rest_day'],
  ['Remarks', 'remarks_additional_remarks'],
];

function helperName(data) {
  return data.personal_info_name || `Helper ${data.id}`;
}

function InfoList({ data, entries = fields }) {
  return (
    <dl className="info-list">
      {entries.map(([label, key]) => data[key] !== undefined && data[key] !== null && data[key] !== '' ? (
        <span key={key}>
          <dt>{label}</dt>
          <dd>{String(data[key])}</dd>
        </span>
      ) : null)}
    </dl>
  );
}

function BiodataPage({ data, agency, failed }) {
  const name = helperName(data);
  return (
    <PublicLayout>
      <Head>
        <title>{name} | Domestic helper profile | Helper4me</title>
        <meta name="description" content={`View the domestic helper profile for ${name}, including experience, skills, availability and agency information.`} />
        <link rel="canonical" href={`https://www.helper4.me/biodata/${data.id}`} />
      </Head>
      {failed ? <p className="empty-state">This helper profile is unavailable.</p> : (
        <>
          <h1 className="page-title">{name}</h1>
          <div className="detail-layout">
            <aside className="detail-panel">
              {data.image ? <img className="card-image" src={data.image} alt={`${name} profile`} /> : <div className="placeholder-image">Image unavailable</div>}
              <InfoList data={data} entries={fields.slice(0, 4)} />
            </aside>
            <div className="detail-panel">
              <h2>Personal information</h2>
              <InfoList data={data} entries={fields.slice(4)} />
              {Array.isArray(data.employment_histories) && data.employment_histories.length > 0 ? (
                <>
                  <h2>Employment history</h2>
                  {data.employment_histories.map((job, index) => <InfoList key={index} data={job} entries={[["Country", "country"], ["Employer", "employer"], ["Work duties", "work_duties"], ["Start date", "start_date"], ["End date", "end_date"]]} />)}
                </>
              ) : null}
              {agency && agency.full_name ? <><h2>Agency</h2><p>{agency.full_name}</p></> : null}
            </div>
          </div>
        </>
      )}
    </PublicLayout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const data = await getPublicHelper(params.id);
    const agency = data.organization ? await getPublicOrganization(data.organization).catch(() => null) : null;
    return { props: { data, agency, failed: false } };
  } catch {
    return { notFound: true };
  }
}

export default BiodataPage;
